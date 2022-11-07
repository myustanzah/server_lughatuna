const { Model } = require('sequelize');
const { UniversalResponse, UniversalErrorResponse } = require('../helper/universalResponse');
const { Areas, User } = require('../models')


class AreaController {
    static async index(){
        
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
            console.error(error)
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }

    }
}

module.exports = AreaController