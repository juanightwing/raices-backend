const Contact = require('../models/contactModel');

const guardarContacto = async (datos) => {
  return await Contact.create(datos);
};

const obtenerContactos = async () => {
  return await Contact.findAll({
    order: [['createdAt', 'DESC']]
  });
};

module.exports = {
  guardarContacto,
  obtenerContactos
};