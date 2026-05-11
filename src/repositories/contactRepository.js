const Contact = require('../models/contactModel');

const guardarContacto = async (datos) => {
  return await Contact.create(datos);
};

const obtenerContactos = async () => {
  return await Contact.findAll({
    order: [['createdAt', 'DESC']]
  });
};

const obtenerContactosPorUsuario = async (userId) => {
  return await Contact.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']]
  });
};

module.exports = {
  guardarContacto,
  obtenerContactos,
  obtenerContactosPorUsuario
};