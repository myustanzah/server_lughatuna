const { Op } = require('sequelize')
const Converter = require('../helper/Converter')
const { UniversalResponse, UniversalErrorResponse } = require('../helper/universalResponse')
const { Students, User, Session, Objectives, Attendance } = require('../models')

class StudentController {
    static async index(req, res){
        try {
            let user_id = req.currentUser.UserId
            const student = await Students.findAll({ 
                    where: {
                        UserId: user_id
                    },
                    include: {
                        all: true
                    }
            })
            res.status(200).json(UniversalResponse(200, "OK", student))
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }

    }
    static async addStudent(req, res){

        try {
            const { user, student } = req.body
            let inputStudent = {
                firstName: student.firstName,
                lastName: student.lastName,
                UserId: null
            }
            
            let inputSession = student.session

            const checkUser = await User.findOne({where: { email: user.email }})

            if (checkUser === null)
                throw UniversalErrorResponse(400, "User Not Found", checkUser)

            inputStudent.UserId = checkUser.id
            
            const studentCreate = await Students.create(inputStudent)
            
            if(!studentCreate || Converter.convertJson(studentCreate) === {})
                throw UniversalErrorResponse(500, "Somethink wronk", studentCreate)
            

            for (let i = 0; i < inputSession.length; i++) {
                inputSession[i].StudentId = studentCreate.id
                const sessionCreate = await Session.create(inputSession[i])
            }
            
            res.status(200).json(UniversalResponse(200, "OK", studentCreate))
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }

    }
}

module.exports = StudentController