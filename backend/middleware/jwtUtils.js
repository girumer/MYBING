const jwt = require('jsonwebtoken');
const { secretkey } = require('./jwtconfig');

const generateJWT = (user) => {
  return jwt.sign({ username: user.username, role: user.role }, secretkey, { expiresIn: '1d' });
};

module.exports = { generateJWT };
