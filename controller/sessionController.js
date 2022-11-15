const { Session, sequelize } = require('../models/index');
const Converter = require('../helper/Converter');
const { UniversalResponse, UniversalErrorResponse } = require('../helper/universalResponse');

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
}

module.exports = SessionController;
