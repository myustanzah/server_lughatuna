const { Session, Attendance, sequelize } = require('../models/index');
const Converter = require('../helper/Converter');
const { UniversalResponse, UniversalErrorResponse } = require('../helper/universalResponse');
const { Op } = require('sequelize');

class SessionController {
    static async editSession(req, res){
        const {session} = req.body
        const { studentId } = req.params
        const t = await sequelize.transaction()
        try {
            const sessionData = await Session.findAll({ where: {StudentId: +studentId} })
            if(!sessionData.length)
                throw UniversalErrorResponse(404, "Session Data Not Found", sessionData)
            
            const temp = []
            for (const data of session) {
                const newDataSession = {
                    monday: data.monday,
                    tuesday: data.tuesday,
                    wednesday: data.wednesday,
                    thursday: data.thursday,
                    friday: data.friday
                }
                const dataSession = await Session.update(newDataSession, {
                    where: {
                        id: data.id
                    },
                    returning: true,
                    raw: true,
                    transaction: t
                })

                if (dataSession[0] !== 1) 
                throw UniversalErrorResponse(500, "Internal Server Error", dataSession)
                
                temp.push(dataSession[1][0])
            }
            await t.commit()
            res.status(201).json(UniversalResponse(201, "Created", temp));
        } catch (error) {
            await t.rollback()
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }
    static async storeAttendant(req, res){
        const { data } = req.body
        const t = await sequelize.transaction()
        try {

            const today_start = new Date().setHours(0, 0, 0, 0);
            const now = new Date(); 


            for (let i = 0; i < data.length; i++) {
                let input = {
                    SessionId: +data[i].idSession,
                    present: data[i].present,
                    absent: data[i].absent,
                    tardy: data[i].tardy,
                    comment: data[i].comment 
                }

                const findSession = await Session.findByPk(input.SessionId)
                if (!findSession) {
                    throw UniversalErrorResponse(404, "Session Not Found", findSession)
                }

                const findAttendance = await Attendance.findOne(
                    {
                        where: 
                        { 
                            [Op.and]: [{ SessionId: input.SessionId }, { createdAt: { [ Op.between ]: [today_start, now] } }]  
                        }
                })

                if (!findAttendance) {

                    const createAttendant = await Attendance.create(input, { transaction: t })
    
                    if (!createAttendant) {
                        throw UniversalErrorResponse(500, "Internal Server Error", createAttendant)
                    }
                } else {
                    console.log("update attendance")

                    findAttendance.present = input.present
                    findAttendance.absent = input.absent
                    findAttendance.tardy = input.tardy
                    findAttendance.comment = input.comment
                    
                    const updateAtt =  await findAttendance.update(Converter.convertJson(findAttendance, { transaction: t }))

                    if (!updateAtt) {
                        throw UniversalErrorResponse(500, "Internal Server Error", findAttendance)
                    }
                }

            }

            await t.commit()
            res.status(201).json(UniversalResponse(200, "Created", {}));
            
        } catch (error) {
            t.rollback()
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }
}

module.exports = SessionController;
