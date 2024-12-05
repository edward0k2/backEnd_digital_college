const express = require('express');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', authRoutes);

module.exports = app;
