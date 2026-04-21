const authService = require('../services/authService');

const registrar = async (req, res) => {
  try {
    const resultado = await authService.registrar(req.body);
    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      data: resultado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const resultado = await authService.login(req.body);
    res.status(200).json({
      mensaje: 'Login exitoso',
      data: resultado
    });
  } catch (error) {
    res.status(401).json({
      mensaje: error.message
    });
  }
};

module.exports = { registrar, login };