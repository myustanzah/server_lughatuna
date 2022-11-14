const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { Observation, User, Students } = require('../models/index')
const { UniversalErrorResponse, UniversalResponse } = require("../helper/universalResponse");


class ObservationController {
    static async index(req, res){
        try {
            const token = req.headers.token
            let user_data = jwt.verify(token, process.env.PRIVATE_KEY)
            const { StudentId } = req.body


            const findUser = await User.findOne({where: {email: user_data.email}})
            if(!findUser)
                throw UniversalErrorResponse(400, "User Not Found", findUser)

            const findStudent = await Students.findOne({where: { id: +StudentId}})
            if (!findStudent)
                throw UniversalErrorResponse(400, "Student Not Found", findStudent)
            
            const findObservation = await Observation.findAll({ where: 
                {
                    [Op.and]: [{ UserId: findUser.id }, {StudentId:  findStudent.id}]   
                },
                include: User
            })
            
            res.status(200).json(UniversalResponse(200, "OK", findObservation))

        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }

    }
    static async addObservation(req, res){
        try {

            let token = req.headers.token
            let user_data = jwt.verify(token, process.env.PRIVATE_KEY)
            let inputObservation = {
                UserId: null,
                StudentId: null,
                description: JSON.parse(req.body.data).description,
                fileUrl: req.file.filename,
            }
            const findUser = await User.findOne({where: {email: user_data.email}})
            
            if(!findUser)
            throw UniversalErrorResponse(400, "User Not Found", findUser)

            inputObservation.UserId = findUser.id

            const findStudent = await Students.findOne({where: { id:  JSON.parse(req.body.data).studentId }})

            if (!findStudent)
                throw UniversalErrorResponse(400, "Student Not Found", findStudent)
            
            inputObservation.StudentId = findStudent.id
            
            const createObservation = await Observation.create(inputObservation)

            res.status(200).json(UniversalResponse(200, "OK", createObservation))
            
        } catch (error) {
            
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
            
        }
    }

    static async getFileObservation(req, res){
        try {

            
            
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }
}

module.exports = ObservationController