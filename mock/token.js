const jwt = require('jsonwebtoken');

const SECRET = 'secret';


function createToken(userType) {
  const payload = {
    userType,
  };

  return jwt.sign(payload, SECRET, {
    issuer: 'react-admin-antd-mobx',
    expiresIn: '5m',
  });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = {
  createToken,
  verifyToken,
};
