const userService = require('../services/userService');

// Requisite 1
const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = await userService.userCreate(displayName, email, password, image);
  if (token.error) return res.status(409).json(token.error);
  return res.status(201).json({ token });
};
module.exports = {
  createUser,
};
