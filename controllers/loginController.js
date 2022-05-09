const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService.login(email, password);
  if (result === null) {
    return res.status(400).json({ menssage: 'invalid fields' });
  }
  return res.status(200).json({ result });
};
module.exports = {
  login,
};
