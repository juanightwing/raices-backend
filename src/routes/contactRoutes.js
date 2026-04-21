const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.post('/', verificarToken, contactController.crearContacto);
router.get('/', verificarToken, contactController.listarContactos);

module.exports = router;