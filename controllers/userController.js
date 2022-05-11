const userService = require('../services/userService');

// Requisite 1
const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = await userService.userCreate(displayName, email, password, image);
  if (token.error) return res.status(409).json(token.error);
  return res.status(201).json({ token });
};

// Requisite 3 - get Users
const getUsers = async (req, res) => {
  const result = await userService.getUsers();
  return res.status(200).json(result);
};

// Requisite 4 - get Users
const userById = async (req, res) => {
  const { id } = req.params;
  const result = await userService.userById(id);
  if (result.error) {
    return res.status(404).json(result.error);
  }
  return res.status(200).json(result);
};
module.exports = {
  createUser,
  getUsers,
  userById,
};
