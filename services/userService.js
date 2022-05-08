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

module.exports = {
  userCreate,
};
