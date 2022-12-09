const MedicalController = require('../controller/medicalController')
const medicalRoute = require('express').Router()

medicalRoute.post('/medical/add/:studentId', MedicalController.addMedical)

module.exports = medicalRoute