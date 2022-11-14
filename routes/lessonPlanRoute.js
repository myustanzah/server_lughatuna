const lessonRoute = require('express').Router()
const LessonPlanController = require('../controller/lessonPlanController')


lessonRoute.post('/lesson/index', LessonPlanController.index)
lessonRoute.post('/lesson/add', LessonPlanController.addLesson)
lessonRoute.post('/lesson/get-by-student', LessonPlanController.getByStudent)
lessonRoute.post('/lesson/delete', LessonPlanController.deleteLessonPlan)

module.exports = lessonRoute