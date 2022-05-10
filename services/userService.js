const { User } = require('../models');
const jwt = require('../auth/validateJWT');

const userCreate = async (displayName, email, password, image) => {
  const getUsers = await User.findAll();
  // O email é uma informação que não pode esxitir ao cadastrar um novo user
  const verifyEmail = getUsers.find((user) => user.email === email);
  if (verifyEmail) {
    return {
      error: {
        message: 'User already registered',
      },
    };
  }
  await User.create({ displayName, email, password, image });
  const token = jwt.createToken({ email });
  return token;
};

const getUsers = async () => {
  const result = await User.findAll({ attributes: { exclude: ['password'] } });
  return result;
};

const userById = async (id) => {
  const result = await User.findByPk(id);
  if (result === null) {
    return {
      error: {
        message: 'User does not exist',
      },
    };
  }
  return result;
};
module.exports = {
  userCreate,
  getUsers,
  userById,
};
