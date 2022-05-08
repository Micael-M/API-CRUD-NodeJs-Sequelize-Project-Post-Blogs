const isEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const validName = (req, res, next) => {
  const { displayName } = req.body;
  const isString = typeof (displayName);
  if (isString !== 'string' || displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const validEmail = (req, res, next) => {
  const { email } = req.body;
  const verifyEmail = isEmail(email);
  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (!verifyEmail) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }
  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: '"password" is required' });
  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  next();
};
module.exports = {
  validName,
  validEmail,
  validPassword,
};