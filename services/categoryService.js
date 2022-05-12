const { Category } = require('../models');

const getCategories = async () => {
  const result = await Category.findAll();
  return result;
};

// Requisite 5 
const createCategory = async (name) => {
  const result = await Category.create({ name });
  return result;
};

const getById = async (id) => {
  const result = await Category.findByPk(id);
  return result;
};

module.exports = {
  getCategories,
  createCategory,
  getById,
};
