const express = require('express');
const { createUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { authenticateToken } = require('/middleware/authMiddleware');

const router = express.Router();

/*
// Rota para obter informações do usuário pelo ID
router.get('/v1/user/:id', getUserById);

// Outras rotas existentes 
router.post('/v1/user', createUser);
router.put('/v1/user/:id', updateUser);
router.delete('/v1/user/:id', deleteUser); */


// Rotas de usuários
router.post('/v1/user', authenticateToken, createUser); 
router.get('/v1/user/:id', getUserById); 
router.put('/v1/user/:id', authenticateToken, updateUser); 
router.delete('/v1/user/:id', authenticateToken, deleteUser);

module.exports = router;
