const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.post('/', contactController.crearContacto);
router.get('/', verificarToken, contactController.listarContactos);
router.get('/mis-solicitudes', verificarToken, contactController.misSolicitudes);

module.exports = router;