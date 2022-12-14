const route = require('express').Router();
const userRoute = require('./userRoute')
const areaRoute = require('./areaRoute');
const studentRoute = require('./studentRoute');
const contactRoute = require('./contactRoute');
const objectiveRoute = require('./objectiveRoute');
const lessonRoute = require('./lessonPlanRoute');
const sessionRoute = require('./sessionRoute');
const observationRoute = require('./observationRoute');
const { authLogin } = require('../helper/middleware/authentication');
const commentRoute = require('./commentRoute');
const medicalRoute = require('./medicalRoute');
const alergiRoute = require('./alergiRoute');

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

// session
route.use(sessionRoute)

// observation
route.use(observationRoute)

// comment
route.use(commentRoute)

// medical
route.use(medicalRoute)

// alergi
route.use(alergiRoute)

module.exports = route