const postService = require('../services/postService');
// Requisite 7
const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const result = await postService.createPost(title, content, categoryIds, id);
  if (result === false) {
    return res.status(400).json({
      message: '"categoryIds" not found' });
  }
  return res.status(201).json(result);
};
module.exports = {
  createPost,
};
