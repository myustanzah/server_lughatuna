const upload = require('../helper/utils/UploadFileObservation')
const ObservationController = require('../controller/observationController')
const observationRoute = require('express').Router()


observationRoute.post('/observation/index', ObservationController.index)
observationRoute.post('/observation/add', upload.single('file_upload'), ObservationController.addObservation)
observationRoute.patch('/observation/edit/:id', ObservationController.editObservation)
observationRoute.delete('/observation/delete/:id', ObservationController.deleteObservetion)


module.exports = observationRoute