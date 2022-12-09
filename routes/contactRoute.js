const contactRoute = require('express').Router();
const ContactController = require('../controller/contactController');
const upload = require('../helper/utils/UploadFileContact')

contactRoute.post('/contact/add/:studentId', ContactController.addContact)
contactRoute.post('/contact/profile/:id', upload.single('file_upload'), ContactController.uploadProfile)


module.exports = contactRoute