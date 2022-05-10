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

module.exports = {
  getCategories,
  createCategory,
};
