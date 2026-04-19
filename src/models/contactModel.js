const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  como_nos_conocio: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'contactos',
  timestamps: true
});

module.exports = Contact;