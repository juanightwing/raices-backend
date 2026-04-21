const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Session = require('../models/sessionModel.js');

const registrar = async (datos) => {
  const { nombre, email, password } = datos;

  if (!nombre || nombre.trim() === '') {
    throw new Error('El nombre es obligatorio');
  }

  if (!email || email.trim() === '') {
    throw new Error('El email es obligatorio');
  }

  if (!password || password.trim() === '') {
    throw new Error('La contraseña es obligatoria');
  }

  if (password.length < 6) {
    throw new Error('La contraseña debe tener mínimo 6 caracteres');
  }

  const usuarioExiste = await User.findOne({ where: { email } });
  if (usuarioExiste) {
    throw new Error('Ya existe un usuario con ese email');
  }

  const passwordEncriptada = await bcrypt.hash(password, 10);

  const nuevoUsuario = await User.create({
    nombre: nombre.trim(),
    email: email.trim().toLowerCase(),
    password: passwordEncriptada
  });

  const token = jwt.sign(
    { id: nuevoUsuario.id, email: nuevoUsuario.email, rol: nuevoUsuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  await Session.create({
    token,
    userId: nuevoUsuario.id
  });

  return {
    usuario: {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol
    },
    token
  };
};

const login = async (datos) => {
  const { email, password } = datos;

  if (!email || !password) {
    throw new Error('Email y contraseña son obligatorios');
  }

  const usuario = await User.findOne({ where: { email } });
  if (!usuario) {
    throw new Error('Credenciales incorrectas');
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) {
    throw new Error('Credenciales incorrectas');
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  await Session.create({
    token,
    userId: usuario.id
  });

  return {
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    },
    token
  };
};

module.exports = { registrar, login };