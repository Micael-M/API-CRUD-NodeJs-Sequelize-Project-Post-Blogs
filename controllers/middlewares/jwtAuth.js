const jwt = require('jsonwebtoken');
require('dotenv').config();
// const { User } = require('../../models');
// const userService = require('../../services/userService');

// Configuração necessária para o jwt AULA 24.1
const { JWT_SECRET } = process.env;
// const jwtConfig = { algorithms: ['HS256'] };

// const isValid = (token) => {
//   const { email } = jwt.verify(token, JWT_SECRET, jwtConfig);
//   return email;
// };

module.exports = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    jwt.verify(token, JWT_SECRET);
    // const decoded = jwt.verify(token, JWT_SECRET);
    // // const email = isValid(token);
    // const userValidate = await userService.getByEmail(decoded.email);
    // console.log(userValidate);
    // if (!userValidate) return res.status(400).json({ message: 'User not found' });
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
