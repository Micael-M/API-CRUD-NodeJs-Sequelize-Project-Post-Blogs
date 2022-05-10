const jwt = require('jsonwebtoken');
const { User } = require('../../models');

// Configuração necessária para o jwt AULA 24.1
const { JWT_SECRET } = process.env;

const jwtAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const { email } = jwt.verify(token, JWT_SECRET);
    const verifyEmail = await User.findOne({ where: { email } });
    if (!verifyEmail) throw new Error();

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = jwtAuth;
