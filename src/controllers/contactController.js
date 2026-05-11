const contactService = require('../services/contactService');

const crearContacto = async (req, res) => {
  try {
    const contactoGuardado = await contactService.crearContacto({
  ...req.body,
  userId: null
});
    res.status(201).json({
      mensaje: 'Contacto registrado exitosamente',
      data: contactoGuardado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};

const listarContactos = async (req, res) => {
  try {
    const contactos = await contactService.listarContactos();
    res.status(200).json({
      mensaje: 'Contactos obtenidos exitosamente',
      data: contactos
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los contactos'
    });
  }
};

const misSolicitudes = async (req, res) => {
  try {
    const userId = req.usuario.id;
    const solicitudes = await contactService.listarMisSolicitudes(userId);
    res.status(200).json({
      mensaje: 'Solicitudes obtenidas exitosamente',
      data: solicitudes
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener las solicitudes'
    });
  }
};

module.exports = {
  crearContacto,
  listarContactos,
  misSolicitudes
};