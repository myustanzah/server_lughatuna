const areaRoute = require('express').Router();
const SessionController = require('../controller/sessionController');

areaRoute.put('/session/edit/:studentId', SessionController.editSession)

module.exports = areaRoute