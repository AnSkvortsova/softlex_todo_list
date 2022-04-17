const jwt = require('jsonwebtoken');
const admins = require('../db/admins_db.json');

const JWT_SECRET = 'fdjfjnsjfdvjsbfdjifqpejiojqefjnfd';

const getToken = (id) => jwt.sign(
  { id },
  JWT_SECRET,
  { expiresIn: '24h' },
);

const isAuthorized = (token) => {
  return jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return false;
    return admin = admins.find(item => item.id === decoded.id);
  });
};

module.exports = {
  getToken,
  isAuthorized
};
