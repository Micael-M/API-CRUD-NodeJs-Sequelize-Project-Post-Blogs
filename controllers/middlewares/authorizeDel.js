const postService = require('../../services/postService');
const { BlogPost } = require('../../models');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const findPost = await BlogPost.findByPk(id);
  if (!findPost) return res.status(404).json({ message: 'Post does not exist' });

  const result = await postService.postById(id);
  if (result.userId !== userId) {
  return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};