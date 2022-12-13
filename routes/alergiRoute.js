const AllergiesController = require('../controller/allergiesController')
const alergiRoute = require('express').Router()

alergiRoute.post('/allergy/add/:studentId', AllergiesController.addAlergies)

module.exports = alergiRoute