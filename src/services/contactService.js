const contactRepository = require('../repositories/contactRepository');

const crearContacto = async (datos) => {
  const { nombre, telefono, email, ciudad, como_nos_conocio, mensaje } = datos;

  if (!nombre || nombre.trim() === '') {
    throw new Error('El nombre es obligatorio');
  }

  if (!telefono || telefono.trim() === '') {
    throw new Error('El teléfono es obligatorio');
  }

  if (telefono.length < 10 || telefono.length > 10) {
    throw new Error('El teléfono debe tener exactamente 10 dígitos');
  }

  if (!/^\d+$/.test(telefono)) {
    throw new Error('El teléfono solo puede contener números');
  }

  if (!email || email.trim() === '') {
    throw new Error('El correo electrónico es obligatorio');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('El correo electrónico no es válido');
  }

  if (!ciudad || ciudad.trim() === '') {
    throw new Error('La ciudad es obligatoria');
  }

  const contactoGuardado = await contactRepository.guardarContacto({
    nombre: nombre.trim(),
    telefono: telefono.trim(),
    email: email.trim(),
    ciudad: ciudad.trim(),
    como_nos_conocio: como_nos_conocio ? como_nos_conocio.trim() : '',
    mensaje: mensaje ? mensaje.trim() : ''
  });

  return contactoGuardado;
};

const listarContactos = async () => {
  return await contactRepository.obtenerContactos();
};

module.exports = {
  crearContacto,
  listarContactos
};