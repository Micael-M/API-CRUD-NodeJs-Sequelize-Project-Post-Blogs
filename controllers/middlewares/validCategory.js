const categoryService = require('../../services/categoryService');

module.exports = async (req, res, next) => {
  const { categoryIds } = req.body;
  const result = await categoryService.getById(categoryIds[0]);
  if (result === null) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};
