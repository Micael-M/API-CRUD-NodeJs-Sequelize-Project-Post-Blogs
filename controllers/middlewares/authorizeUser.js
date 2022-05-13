const postService = require('../../services/postService');

module.exports = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.params;
  const userId = req.user.id;
  const result = await postService.postById(id);
  if (result.userId !== userId) {
  console.log('Não autorizado');
  return res.status(401).json({ message: 'Unauthorized user' });
  }
  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });
  if (categoryIds) return res.status(400).json({ message: 'Categories cannot be edited' });

  next();
};
