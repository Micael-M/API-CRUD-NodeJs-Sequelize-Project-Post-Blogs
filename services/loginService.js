const { User } = require('../models');
const jwt = require('../auth/validateJWT');

const login = async (email, password) => {
  const resultUser = await User.findOne({ where: { email } });

  if (resultUser === null || resultUser.password !== password) {
    return null;
  }
  const token = jwt.createToken({ email });
  return token;
};
module.exports = {
  login,
};
