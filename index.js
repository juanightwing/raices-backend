const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/database');

const contactRoutes = require('./src/routes/contactRoutes');
const authRoutes = require('./src/routes/authRoutes');

require('./src/models/userModel');
require('./src/models/sessionModel');
require('./src/models/contactModel');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/contactos', contactRoutes);

app.get('/', (req, res) => {
  res.send('API Raíces de Justicia funcionando');
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error conectando a la base de datos:', error);
  });