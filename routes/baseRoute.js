const route = require('express').Router();
const userRoute = require('./userRoute')
const areaRoute = require('./areaRoute');
const studentRoute = require('./studentRoute');
const contactRoute = require('./contactRoute');
const objectiveRoute = require('./objectiveRoute');
const lessonRoute = require('./lessonPlanRoute');
const observationRoute = require('./observationRoute');
const { authLogin } = require('../helper/middleware/authentication');

// user
route.use(userRoute)

route.use(authLogin)
// area
route.use(areaRoute)

// student
route.use(studentRoute)

// contact
route.use(contactRoute)

// objective
route.use(objectiveRoute)

// lesson plan
route.use(lessonRoute)

// observation
route.use(observationRoute)

module.exports = route