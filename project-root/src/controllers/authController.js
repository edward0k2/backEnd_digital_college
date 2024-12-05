const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Função para gerar token JWT
const generateToken = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Encontrar usuário pelo email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Verificar senha
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Gerar token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  generateToken
};
