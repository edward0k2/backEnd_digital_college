const Category = require('../models/category');

// Função para obter lista de categorias
const getCategories = async (req, res) => {
  try {
    const { limit = 12, page = 1, fields = 'name,slug', use_in_menu } = req.query;
    const queryOptions = {
      attributes: fields.split(','),
      limit: limit === '-1' ? null : parseInt(limit, 10),
      offset: (page - 1) * limit,
      where: {}
    };

    if (use_in_menu) {
      queryOptions.where.use_in_menu = use_in_menu === 'true';
    }

    const { count, rows } = await Category.findAndCountAll(queryOptions);

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

// Função para obter informações da categoria pelo ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      attributes: ['id', 'name', 'slug', 'use_in_menu']
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para criar categoria
const createCategory = async (req, res) => {
  try {
    const { name, slug, use_in_menu } = req.body;
    const newCategory = await Category.create({ name, slug, use_in_menu });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para atualizar categoria pelo ID
const updateCategory = async (req, res) => {
  try {
    const { name, slug, use_in_menu } = req.body;
    const [updated] = await Category.update(
      { name, slug, use_in_menu },
      { where: { id: req.params.id } }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para deletar categoria pelo ID
const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
