const express = require('express');
const { generateToken } = require('../controllers/authController');

const router = express.Router();

// Rota para gerar o token JWT
router.post('/v1/user/token', generateToken);

module.exports = router;
