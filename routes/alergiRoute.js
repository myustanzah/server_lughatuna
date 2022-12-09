const AllergiesController = require('../controller/allergiesController')
const alergiRoute = require('express').Router()

alergiRoute.post('alergi/add/:studentId', AllergiesController.addAlergies)

module.exports = alergiRoute