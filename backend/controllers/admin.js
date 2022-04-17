const admins = require('../db/admins_db.json');
const { getToken, isAuthorized } = require('../utils/jwt');

const login = (req, res) => {
  const {username, password} = req.body;
  const isAdmin = admins.some(item => (item.username === username) && (item.password === password));
  
  if (!isAdmin) {
    res.status(401).send({
      status: 'error',
      message: 'Неверный логин или пароль'
    })
  } else {
    const admin = admins.find(el => (el.username === username) && (el.password === password));
    const token = getToken(admin.id)
    res.status(200).send({
      status: 'ok',
      token: token
    })
  };
};

const auth = (req, res) => {
  const {token} = req.body;
  const adminData = isAuthorized(token);
  const isAdmin = admins.some(item => item.id === adminData.id);

  if(!isAdmin) {
    res.status(404).send({
      status: 'error',
      message: 'Необходима авторизация'
    })
  } else {
    res.status(200).send({
      status: 'ok'
    })
  };
};

module.exports = {
  login,
  auth
};