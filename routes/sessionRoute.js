const sessionRoute = require('express').Router();
const SessionController = require('../controller/sessionController');

sessionRoute.put('/session/edit/:studentId', SessionController.editSession)
sessionRoute.post('/session/attendance', SessionController.storeAttendant)

module.exports = sessionRoute