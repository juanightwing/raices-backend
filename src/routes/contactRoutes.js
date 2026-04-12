const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/', contactController.crearContacto);
router.get('/', contactController.listarContactos);

module.exports = router;