const studentRoute = require('express').Router();
const StudentController = require('../controller/studentController');


studentRoute.post('/student/index', StudentController.index)
studentRoute.post('/student/add-student', StudentController.addStudent)

module.exports = studentRoute