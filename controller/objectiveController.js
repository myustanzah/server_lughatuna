const { UniversalResponse, UniversalErrorResponse } = require("../helper/universalResponse")
const { Objective } = require("../models/index")

class ObjectiveController {

    static async index(req, res){
        try {
            
        } catch (error) {
            
        }

    }
    static async addObjective(req, res){
        try {

            const { data } = req.body
            const areaId = req.params.AreaId

            data.AreaId = areaId

            const createObjective = await Objective.create(data)
            if(!createObjective)
                throw UniversalErrorResponse(400, "Bad Request", "Internal Server Error")
            
            res.status(200).json(UniversalResponse(200, "Ok", createObjective))
            
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }

        

    }

}

module.exports = ObjectiveController