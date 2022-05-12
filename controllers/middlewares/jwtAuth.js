const jwt = require('jsonwebtoken');
const userService = require('../../services/userService');

// Configuração necessária para o jwt AULA 24.1
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
  try {
    const { email } = jwt.verify(token, JWT_SECRET);
    console.log(email);

    const user = await userService.getByEmail(email);
    if (!user) throw new Error();
    // Salva o usuário
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
