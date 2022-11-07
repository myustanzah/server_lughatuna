const areaRoute = require('express').Router();
const AreaController = require('../controller/areaController');

areaRoute.post('/area/index', AreaController.index)
areaRoute.post('/area/add-area', AreaController.addArea)

module.exports = areaRoute