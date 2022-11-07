const route = require('express').Router();
const userRoute = require('./userRoute')
const areaRoute = require('./areaRoute');
const studentRoute = require('./studentRoute');
const objectiveRoute = require('./objectiveRoute');


// user
route.use(userRoute)

// area
route.use(areaRoute)

// student
route.use(studentRoute)

// objective
route.use(objectiveRoute)

module.exports = route