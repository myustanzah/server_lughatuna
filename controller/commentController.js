const { Observation, Comment } = require('../models/index')
const { UniversalErrorResponse, UniversalResponse } = require("../helper/universalResponse");
const Converter = require('../helper/Converter');

class CommentController {
    static async index(req, res){
        try {
            
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }

    }
    static async addComment(req, res){
        try {

            const { id } = req.params
            const { description } = req.body

            let input = {
                ObservationId: null,
                description: description
            }

            const findObservation = await Observation.findByPk(+id)

            if(!findObservation)
                throw UniversalErrorResponse(400, "Internal Server Error", "Observation not found")

            input.ObservationId = findObservation.id

            const createComment = await Comment.create(input)

            res.status(200).json(UniversalResponse(200, "OK", createComment))
            
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }

    }

    static async editComment(req, res){
        try {
           const { id } = req.params
           const { comment } = req.body

           let findComment = await Comment.findByPk(+id)

           if(!findComment)
                throw UniversalErrorResponse(500, "Internal Server Error", "Comment Not Found")

            findComment.description = comment

            const convertComment = Converter.convertJson(findComment)
            const editComment = await findComment.update(convertComment)
            
           res.status(201).json(UniversalResponse(201, "OK", editComment))

        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }

    static async deleteComment(req, res){
        try {

           const { id } = req.params

           let findComment = await Comment.findByPk(+id)

           if(!findComment)
                throw UniversalErrorResponse(500, "Internal Server Error", "Comment Not Found")

            const convertComment = Converter.convertJson(findComment)
            const deleteComment = await findComment.destroy(convertComment)

           res.status(200).json(UniversalResponse(200, "OK", deleteComment))
            
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }
}

module.exports = CommentController