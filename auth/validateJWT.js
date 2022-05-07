const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const createToken = (payload, expire = '60m') =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: expire,
    algorithm: 'HS256',
  });

const decodeToken = (token) =>
  jwt.verify(token, JWT_SECRET);

module.exports = {
  createToken,
  decodeToken,
};