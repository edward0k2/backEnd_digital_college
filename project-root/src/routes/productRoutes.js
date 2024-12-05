const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { authenticateToken } = require('/middleware/authMiddleware');

const router = express.Router();

// Rotas de produtos
router.get('/v1/product/search', getProducts);
router.get('/v1/product/:id', getProductById);
router.post('/v1/product', authenticateToken, createProduct);
router.put('/v1/product/:id', authenticateToken, updateProduct);
router.delete('/v1/product/:id', authenticateToken, deleteProduct);

module.exports = router;

/*
// Rota para obter uma lista de produtos
router.get('/v1/product/search', getProducts);

// Outras rotas para produtos
router.get('/v1/product/:id', getProductById);
router.post('/v1/product', createProduct);
router.put('/v1/product/:id', updateProduct);
router.delete('/v1/product/:id', deleteProduct);

module.exports = router; */
