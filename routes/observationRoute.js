const upload = require('../helper/utils/UploadFileObservation')
const ObservationController = require('../controller/observationController')
const observationRoute = require('express').Router()


observationRoute.post('/observation/index', ObservationController.index)
observationRoute.post('/observation/add', upload.single('file_upload'), ObservationController.addObservation)


module.exports = observationRoute