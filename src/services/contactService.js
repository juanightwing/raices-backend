const contactRepository = require('../repositories/contactRepository');

const crearContacto = async (datos) => {
  const { nombre, telefono, descripcion } = datos;

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

  const contactoGuardado = await contactRepository.guardarContacto({
    nombre: nombre.trim(),
    telefono: telefono.trim(),
    descripcion: descripcion ? descripcion.trim() : ''
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