const userRoute = require('express').Router();
const AccountController = require('../controller/accountController');

userRoute.get('/', AccountController.getData)
userRoute.post('/user/index', AccountController.index)
userRoute.post('/user/login', AccountController.login)
userRoute.post('/user/register', AccountController.register)

module.exports = userRoute
