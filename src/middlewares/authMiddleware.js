const jwt = require('jsonwebtoken');
const Session = require('../models/sessionModel');

const verificarToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({
        mensaje: 'Acceso denegado. No se proporcionó token'
      });
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const sesion = await Session.findOne({
      where: { token, activo: true }
    });

    if (!sesion) {
      return res.status(401).json({
        mensaje: 'Token inválido o sesión cerrada'
      });
    }

    req.usuario = decoded;
    next();

  } catch (error) {
    return res.status(401).json({
      mensaje: 'Token inválido o expirado'
    });
  }
};

module.exports = { verificarToken };