const { Users } = require('../models');
const jwt = require('../auth/validateJWT');

const userCreate = async (displayName, email, password, image) => {
  const getUsers = await Users.findAll();
  // O email é uma informação que não pode esxitir ao cadastrar um novo user
  const verifyEmail = getUsers.find((user) => user.email === email);
  if (verifyEmail) {
    return {
      error: {
        message: 'User already registered',
      },
    };
  }
  await Users.create({ displayName, email, password, image });
  const token = jwt.createToken({ email });
  return token;
};

const getUsers = async () => {
  const result = await Users.findAll({ attributes: { exclude: ['password'] } });
  return result;
};

const getByEmail = async (email) => {
  const result = await Users.findOne({
    where: { email }, attributes: { exclude: ['password', 'image', 'displayName'] },
  });
  return result;
};

const userById = async (id) => {
  const result = await Users.findByPk(id);
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
  getByEmail,
};
