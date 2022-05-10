const { Category } = require('../models');

const getCategories = async () => {
  const result = await Category.findAll();
  return result;
};

module.exports = {
  getCategories,
};
