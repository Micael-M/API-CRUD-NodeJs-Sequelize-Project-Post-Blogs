const categoryService = require('../services/categoryService');

// Requisite 6
const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  const result = await categoryService.createCategory(name);
  return res.status(201).json(result);
};

// Requisite 6
const getCategories = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  const allCategories = await categoryService.getCategories();
  return res.status(200).json(allCategories);
};

module.exports = {
  getCategories,
  createCategory,
};