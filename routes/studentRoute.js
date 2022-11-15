const studentRoute = require('express').Router();
const StudentController = require('../controller/studentController');
const upload = require('../helper/utils/UploadFileStudent');

studentRoute.post('/student/index', StudentController.index)
studentRoute.post('/student/add-student', StudentController.addStudent)
studentRoute.post('/student/profile/:id', upload.single('file_upload'), StudentController.uploadProfile)
studentRoute.put('/student/:id', StudentController.editStudent)
studentRoute.patch('/student/:id', StudentController.hideStudent)

module.exports = studentRoute