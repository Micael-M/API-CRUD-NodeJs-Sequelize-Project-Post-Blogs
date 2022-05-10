const { Users } = require('../models');
const jwt = require('../auth/validateJWT');

const login = async (email, password) => {
  const resultUser = await Users.findOne({ where: { email } });
  if (resultUser === null || resultUser.password !== password) {
    return {
      error: { message: 'Invalid fields' } };
  }
  const token = jwt.createToken({ email });
  return { token }; // Alteração sugerida pelo colega Luiz Ricardo T16 - Tribo A
};
module.exports = {
  login,
};
