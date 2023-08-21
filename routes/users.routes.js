const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/users/users.controllers');
const Authrouter = require('express').Router();

Authrouter.post('/register', register);
Authrouter.post('/login', login);
Authrouter.post('/forgotpassword', forgotPassword);
Authrouter.post('/reset-password', resetPassword);

module.exports = Authrouter;
