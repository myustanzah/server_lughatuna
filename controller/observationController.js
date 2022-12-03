const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { Observation, User, Students, Comment } = require('../models/index')
const { UniversalErrorResponse, UniversalResponse } = require("../helper/universalResponse");
const Converter = require("../helper/Converter");


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
                include: [
                    User,
                    Comment
                ]
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

    static async editObservation(req, res){
        try {
           const { id } = req.params
           const { description } = req.body

           let findObservation = await Observation.findByPk(+id)

           if(!findObservation)
                throw UniversalErrorResponse(400, "internal server error", "Observation Not Found")

            findObservation.description = description

            const obsConvert = Converter.convertJson(findObservation)
            const obsAfterUpdate = await findObservation.update(obsConvert)

            res.status(201).json(UniversalResponse(201, "OK", obsAfterUpdate))
            
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }

    static async deleteObservetion(req, res){
        try {
            const { id } = req.params

            let findObservation = await Observation.findByPk(+id)

            if(!findObservation)
                throw UniversalErrorResponse(400, "internal server error", "Observation Not Found")
            
            const obsConvert = Converter.convertJson(findObservation)
            const obsAfterDelete = await findObservation.destroy(obsConvert)

            if(obsAfterDelete.length !== 0)
                throw UniversalErrorResponse(500, "internal server error", "")

            res.status(200).json(UniversalResponse(200, "OK", obsAfterDelete))
            
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }

}

module.exports = ObservationController