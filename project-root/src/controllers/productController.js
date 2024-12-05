const Product = require('../models/product');
const ProductImage = require('../models/productImage');
const ProductOption = require('../models/productOption');
const Category = require('../models/category');

// Função para obter lista de produtos
const getProducts = async (req, res) => {
  try {
    const { limit = 12, page = 1, fields = 'name,images,price', match, category_ids, price_range, ...options } = req.query;
    const queryOptions = {
      attributes: fields.split(','),
      limit: limit === '-1' ? null : parseInt(limit, 10),
      offset: (page - 1) * limit,
      where: {}
    };

    if (match) {
      queryOptions.where = {
        [Op.or]: [
          { name: { [Op.like]: `%${match}%` } },
          { description: { [Op.like]: `%${match}%` } }
        ]
      };
    }

    if (category_ids) {
      queryOptions.include = [
        {
          model: Category,
          where: { id: category_ids.split(',') },
          attributes: []
        }
      ];
    }

    if (price_range) {
      const [min, max] = price_range.split('-').map(Number);
      queryOptions.where.price = { [Op.between]: [min, max] };
    }

    // Implementar filtros adicionais conforme necessário

    const { count, rows } = await Product.findAndCountAll(queryOptions);

    res.status(200).json({
      data: rows,
      total: count,
      limit: limit === '-1' ? count : parseInt(limit, 10),
      page: parseInt(page, 10)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para obter informações do produto pelo ID
const getProductById = async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          { model: Category, through: { attributes: [] } },
          { model: ProductImage, attributes: ['id', 'content'] },
          { model: ProductOption }
        ]
      });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Função para criar produto
const createProduct = async (req, res) => {
  const { enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options } = req.body;
  try {
    const newProduct = await Product.create({ enabled, name, slug, stock, description, price, price_with_discount });

    // Adicionar categorias
    if (category_ids) {
      const categories = await Category.findAll({ where: { id: category_ids } });
      await newProduct.setCategories(categories);
    }

    // Adicionar imagens
    if (images) {
      const imagePromises = images.map(image => ProductImage.create({ ...image, product_id: newProduct.id }));
      await Promise.all(imagePromises);
    }

    // Adicionar opções
    if (options) {
      const optionPromises = options.map(option => ProductOption.create({ ...option, product_id: newProduct.id }));
      await Promise.all(optionPromises);
    }

    const createdProduct = await Product.findByPk(newProduct.id, {
      include: [
        { model: Category, through: { attributes: [] } },
        { model: ProductImage, attributes: ['id', 'content'] },
        { model: ProductOption }
      ]
    });

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para atualizar produto pelo ID
const updateProduct = async (req, res) => {
    const { enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options } = req.body;
    try {
      const [updated] = await Product.update(
        { enabled, name, slug, stock, description, price, price_with_discount },
        { where: { id: req.params.id } }
      );
      if (!updated) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const product = await Product.findByPk(req.params.id);
  
      // Atualizar categorias
      if (category_ids) {
        const categories = await Category.findAll({ where: { id: category_ids } });
        await product.setCategories(categories);
      }
  
      // Atualizar imagens
      if (images) {
        const existingImages = await ProductImage.findAll({ where: { product_id: req.params.id } });
  
        for (const image of images) {
          if (image.deleted) {
            await ProductImage.destroy({ where: { id: image.id } });
          } else if (image.id) {
            await ProductImage.update(image, { where: { id: image.id } });
          } else {
            await ProductImage.create({ ...image, product_id: req.params.id });
          }
        }
      }
  
      // Atualizar opções
      if (options) {
        const existingOptions = await ProductOption.findAll({ where: { product_id: req.params.id } });
  
        for (const option of options) {
          if (option.deleted) {
            await ProductOption.destroy({ where: { id: option.id } });
          } else if (option.id) {
            await ProductOption.update(option, { where: { id: option.id } });
          } else {
            await ProductOption.create({ ...option, product_id: req.params.id });
          }
        }
      }
  
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
   
// Função para deletar produto pelo ID
const deleteProduct = async (req, res) => {
    try {
      const deleted = await Product.destroy({
        where: { id: req.params.id }
      });
      if (!deleted) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const { Op } = require('sequelize');
  const Product =
  
  module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  };
  