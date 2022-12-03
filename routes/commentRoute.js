const CommentController = require('../controller/commentController')
const commentRoute = require('express').Router()

commentRoute.post('/comment/index', CommentController.index)
commentRoute.post('/comment/add/:id', CommentController.addComment)
commentRoute.put('/comment/edit/:id', CommentController.editComment)
commentRoute.delete('/comment/delete/:id', CommentController.deleteComment)

module.exports = commentRoute