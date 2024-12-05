const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const User = require('./models/user');
const userRoutes = require('./routes/userRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes'); 
const productRoutes = require('./routes/productRoutes'); 
const authRoutes = require('./routes/authRoutes');
const Category = require('./models/category');
const Product = require('./models/product');
const ProductImage = require('./models/productImage');
const ProductOption = require('./models/productOption');
const ProductCategory = require('./models/productCategory');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
}).catch(error => console.log('This error occurred', error));

app.use(express.json());
app.use('/api', userRoutes); 
app.use('/api', categoryRoutes); 
app.use('/api', productRoutes); 
app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
