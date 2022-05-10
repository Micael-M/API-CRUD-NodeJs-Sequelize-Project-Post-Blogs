const categoryService = require('../services/categoryService');

// Requisite 6
const getCategories = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  const allCategories = await categoryService.getCategories();
  // Falta validar se o token é inválido
  res.status(200).json(allCategories);
};

module.exports = {
  getCategories,
};