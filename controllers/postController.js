// Requisite 7
const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  return res.status(201).json({ title, content, categoryIds });
};
module.exports = {
  createPost,
};
