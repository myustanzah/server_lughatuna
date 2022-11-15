const contactRoute = require('express').Router();
const ContactController = require('../controller/contactController');

contactRoute.post('/contact/add/:studentId', ContactController.addContact)


module.exports = contactRoute