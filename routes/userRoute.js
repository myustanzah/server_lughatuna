const userRoute = require('express').Router();
const AccountController = require('../controller/accountController');
const upload = require('../helper/utils/UploadFileUser')

userRoute.get('/', AccountController.getData)
userRoute.post('/user/index', AccountController.index)
userRoute.post('/user/login', AccountController.login)
userRoute.post('/user/register', AccountController.register)
userRoute.post('/user/edit/:id', AccountController.editUser)
userRoute.post('/user/edit-foto/:id', upload.single("file_upload") ,AccountController.editFoto)
userRoute.post('/user/delete/:id', AccountController.deleteUser)
userRoute.post('/user/reset-password', AccountController.resetPassword)
// userRoute.post('/user/get-data-user', AccountController.getDataUser)

module.exports = userRoute
