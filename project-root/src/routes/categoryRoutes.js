const express = require('express');
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { authenticateToken } = require('/middleware/authMiddleware');

const router = express.Router();

// Rotas de categorias
router.get('/v1/category/search', getCategories);
router.get('/v1/category/:id', getCategoryById);
router.post('/v1/category', authenticateToken, createCategory);
router.put('/v1/category/:id', authenticateToken, updateCategory);
router.delete('/v1/category/:id', authenticateToken, deleteCategory);

module.exports = router;


/*
// Rota para obter uma lista de categorias
router.get('/v1/category/search', getCategories);

// Rota para obter informações da categoria pelo ID
router.get('/v1/category/:id', getCategoryById);

// Rota para criar uma nova categoria
router.post('/v1/category', createCategory);

// Rota para atualizar uma categoria pelo ID
router.put('/v1/category/:id', updateCategory);

// Rota para deletar uma categoria pelo ID
router.delete('/v1/category/:id', deleteCategory);

module.exports = router; */
