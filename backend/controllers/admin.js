const bcrypt = require('bcrypt');

const admins = require('../db/admins_db.json');
const { getToken } = require('../utils/jwt');

const saltRounds = 10;

const authAdmin = (req, res) => {
  const {username, password} = req.body;
  const isAdmin = admins.some(item => (item.username === username) && (item.password === password));
  
  console.log(username, password)
  if (!isAdmin) {
    res.status(401).send({
      status: 'error',
      message: 'Неверный логин или пароль'
    })
  } else {
    const admin = admins.find(el => (el.username === username) && (el.password === password));
    console.log(admin)
    const token = getToken(admin.id)
    res.status(200).send({
      status: 'ok',
      token: token
    })
  };
};

module.exports = {
  authAdmin
};