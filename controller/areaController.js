const Converter = require('../helper/Converter');
const { UniversalResponse, UniversalErrorResponse } = require('../helper/universalResponse');
const { Areas, User, Objective, Students } = require('../models/index')


class AreaController {
    static async index(req, res){
        try {
            let user_id = req.currentUser.UserId
            const area = await Areas.findAll({ 
                    where: {
                        UserId: user_id
                    },
                    include: [
                        {
                            model: Objective,
                            include: {
                                model: Students
                            }
                        }
                    ]
            })
            res.status(200).json(UniversalResponse(200, "OK", area))
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
        
    }
    static async addArea(req, res){
        try {

            const { user, areaData } = req.body

            let inputArea = {
                user: {
                    email: user.email,
                },
                areaData: {
                    name: areaData.name,
                    UserId: null
                }
            }
            
            const UsersData = await User.findOne({ where: { email: inputArea.user.email } });
            
            if(UsersData === null){
                throw UniversalErrorResponse(400, "User not found", UsersData)
            } else {
                inputArea.areaData.UserId = UsersData.id
                const addAreaData = await Areas.create(inputArea.areaData)

                res.status(200).json(UniversalResponse(200, "Ok", addAreaData))
            }
            
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }

    }

    static async hideArea(req, res) {
        try {
            let areaId = req.params.id
            let status = req.body.status

            const areaUpdate = await Areas.findOne({where: { id: areaId }})

            if (!areaUpdate) 
                throw UniversalErrorResponse(400, "Area not found", areaUpdate)

            areaUpdate.hide = status
            const dataConvert = Converter.convertJson(areaUpdate)
            const areaAfterUpdate = await areaUpdate.update(dataConvert)

            if(!areaAfterUpdate)
                throw UniversalErrorResponse(500, "Internal Server Error", areaAfterUpdate)

            res.status(200).json(UniversalResponse(200, "Ok", {id: areaId, response: areaUpdate}))

        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }
}

module.exports = AreaController