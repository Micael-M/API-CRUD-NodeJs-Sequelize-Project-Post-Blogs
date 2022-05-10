const userService = require('../services/userService');
const jwt = require('../auth/validateJWT');

// Requisite 1
const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = await userService.userCreate(displayName, email, password, image);
  if (token.error) return res.status(409).json(token.error);
  return res.status(201).json({ token });
};

// Requisite 3 - get Users
const getUsers = async (_req, res) => {
  const result = await userService.getUsers();
  return res.status(200).json(result);
};

const userById = async (req, res) => {
  const token = req.headers.authorization;
  console.log('passei');
  const { id } = req.params;
  const result = await userService.userById(id);
  if (result.error) {
    return res.status(404).json(result.error);
  }
  if (!token) return res.status(401).json({ message: 'Token not found' });
  return res.status(200).json(result);

// tentar fazer um miiddleware só para testar isso
  // try {
  //   jwt.decodeToken(token);
  //   return res.status(200).json(result);
  // } catch (err) {
  //   return res.status(401).json({ message: 'Expired or invalid token' });
  // }
};
module.exports = {
  createUser,
  getUsers,
  userById,
};
