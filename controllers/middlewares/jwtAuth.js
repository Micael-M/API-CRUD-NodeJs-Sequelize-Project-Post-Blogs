// const jwt = require('jsonwebtoken');

// // Configuração necessária para o jwt AULA 24.1
// const { JWT_SECRET } = process.env;
// const JWT_CONFIG = {
//   expiresIn: '15m',
//   algorithm: 'HS256',
// };
// // Fim da Configuração necessária para o jwt

// const jwtAuth = async (req, res, next) => {
//   // const token = req.headers.authorization;
//   const { email } = req.body;
//   // console.log(req.body);

//   // gerando token
//   const token = jwt.sign({ data: email }, JWT_SECRET, JWT_CONFIG);
//   console.log(token);

//   if (!token) {
//     return res.status(401).json({ message: 'Token not found' });
//   }
//   try {
//     const result = jwt.verify(token, JWT_SECRET, JWT_CONFIG);
//     console.log('Dentro do JWT');
//     console.log(result);
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Expired or invalid token' });
//   }
// };

// module.exports = jwtAuth;
