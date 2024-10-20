const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Ruta para registrar usuarios
router.post('/register', authController.register);

// Ruta para login de usuarios
router.post('/login', authController.login);

module.exports = router;
