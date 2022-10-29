const route = require('express').Router();
const AccountController = require('../controller/accountController')

route.get('/', AccountController.getData)

route.post('/login', AccountController.login)

module.exports = route