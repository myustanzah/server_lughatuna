const { Op } = require('sequelize')
const { UniversalErrorResponse, UniversalResponse } = require('../helper/universalResponse')
const { LessonsPlan, Objective, Students, Areas } = require('../models/index')

class LessonPlanController {
    static async index(req, res) {

        try {
            let { filter } = req.body
            let user = req.currentUser
            let modelsJoin;
            let modelFind;
            let modelJoinObjective;
            
            if (filter === "STUDENT") {
                modelsJoin = Objective
                modelFind = Students
                modelJoinObjective = Areas
            } else if (filter === "OBJECTIVE") {
                modelsJoin = Students
                modelFind = Objective
            }


            const index = await modelFind.findAll({
                where: {
                    UserId: user.UserId
                },
                include: {
                    model: modelsJoin,
                    required: true,
                    include: {
                        model: modelJoinObjective
                    },
                    through: {
                      attributes: []
                    }
                  }
            })

            res.status(200).json(UniversalResponse(200, "OK", index))
            
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
        
    }
    static async addLesson(req, res){
        try {

            const { objectiveId, studentId } = req.body
            let inputLessonPlan = {}

            const findStudent = await Students.findOne( { where : { id: studentId } } )
            const findObjective = await Objective.findOne( { where : {id : objectiveId } } )
            const lessonCheck = await LessonsPlan.findOne({
                where: {
                    [Op.and] : [{ObjectiveId: objectiveId}, {StudentId: studentId}]
                }
            })

            if(!findStudent)
                throw UniversalErrorResponse(400, "Student Not Found", findStudent)
            
            if(!findObjective)
                throw UniversalErrorResponse(400, "Objective Not Found", findObjective)
                
            if(lessonCheck)
                throw UniversalErrorResponse(401, "Lesson Alrady Exist", lessonCheck)
                
            inputLessonPlan.ObjectiveId = objectiveId
            inputLessonPlan.StudentId = studentId
            
            const inputLesson = await LessonsPlan.create(inputLessonPlan)

            if(!inputLesson)
                throw UniversalErrorResponse(500, "Internal Server Error", inputLesson)

            res.status(200).json(UniversalResponse(200, "OK", inputLessonPlan))

        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }

    static async quickEntry(req, res){
        try {

            const { objectiveId, studentId, progress, comment } = req.body
            let inputLessonPlan = {}
            const findStudent = await Students.findOne( { where : { id: studentId } } )
            const findObjective = await Objective.findOne( { where : {id : objectiveId } } )
            const lessonCheck = await LessonsPlan.findOne({
                where: {
                    [Op.and] : [{ObjectiveId: objectiveId}, {StudentId: studentId}]
                }
            })

            if(!findStudent)
                throw UniversalErrorResponse(400, "Student Not Found", findStudent)
            
            if(!findObjective)
                throw UniversalErrorResponse(400, "Objective Not Found", findObjective)
            
            if(lessonCheck)
                throw UniversalErrorResponse(401, "Lesson Already Exist", lessonCheck)
            
            inputLessonPlan.ObjectiveId = objectiveId
            inputLessonPlan.StudentId = studentId
            inputLessonPlan.command = comment
            inputLessonPlan.progress = progress
            
            console.log("ini body",inputLessonPlan)
            const inputLesson = await LessonsPlan.create(inputLessonPlan)
            
            if(!inputLesson)
                throw UniversalErrorResponse(500, "Internal Server Error", inputLesson)

            res.status(200).json(UniversalResponse(200, "OK", inputLessonPlan))

        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }

    static async getByStudent(req, res){
        try {
            
            const { studentId } = req.body

            const studentAndLesson = await Students.findOne({ 
                where: {
                    id: studentId
                },
                include: {
                    model: Objective,
                    through: {
                            attributes: []
                        }
                }
            });

            if(!studentAndLesson)
                throw UniversalErrorResponse(400, "Student Not Found", studentAndLesson)

            res.status(200).json(UniversalResponse(200, "OK", studentAndLesson))

        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }

    static async deleteLessonPlan(req, res){
        try {
            const { studentId, objectiveId } = req.body

            const findLesson = await LessonsPlan.findOne({where: 
                {
                    [Op.and]: [{ ObjectiveId: objectiveId }, {StudentId:  studentId}]
                }
            })

            if (!findLesson) 
                throw UniversalErrorResponse(400, "lesson not found", findLesson)
            
            const deleteLesson = await LessonsPlan.destroy({where:
                {
                    [Op.and]: [{ ObjectiveId: objectiveId }, {StudentId:  studentId}]
                }
            })

            if (deleteLesson !== 1) 
                throw UniversalErrorResponse(500, "Internal Server Error", deleteLesson)

            res.status(200).json(UniversalResponse(200, "OK", deleteLesson))

        } catch (error) {

            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
            
        }
    }
}

module.exports = LessonPlanController