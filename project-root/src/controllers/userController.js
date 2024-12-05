const User = require('../models/user');
const bcrypt = require('bcrypt');

// Função para criar usuário
const createUser = async (req, res) => {
  try {
    const { firstname, surname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ firstname, surname, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para obter usuário pelo ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'firstname', 'surname', 'email']
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para atualizar usuário pelo ID
const updateUser = async (req, res) => {
  try {
    const { firstname, surname, email } = req.body;
    const [updated] = await User.update(
      { firstname, surname, email },
      { where: { id: req.params.id } }
    );
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para deletar usuário pelo ID
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
