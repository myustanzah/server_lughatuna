const objectiveRoute = require('express').Router();
const ObjectiveController = require('../controller/objectiveController');

objectiveRoute.post('/objective/list/:AreaId', ObjectiveController.index)
objectiveRoute.post('/objective/add/:AreaId', ObjectiveController.addObjective)

module.exports = objectiveRoute