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

// Requisite 8 - get /post
const getPosts = async (_req, res) => {
  const result = await postService.getPosts();
  return res.status(200).json(result);
};

// Requisite 9 - get /post/id
const postById = async (req, res) => {
  const { id } = req.params;
  const result = await postService.postById(id);
  if (result.error) return res.status(404).json(result.error);
  return res.status(200).json(result);
};

// Requisite 10 - get /post/id
const putPost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const result = await postService.putPost(title, content, id);
  return res.status(200).json(result);
};
module.exports = {
  createPost,
  getPosts,
  postById,
  putPost,
};
