const jwt = require('jsonwebtoken');
const { User } = require('../../models/index');
const { UniversalErrorResponse } = require('../universalResponse');

const authLogin = async (req, res, next) => {
    try {
        
        if (!req.headers.token) {
            throw UniversalErrorResponse(401, "Invalid", "Please Login First")
        } else {

            const user_access = jwt.verify(req.headers.token, process.env.PRIVATE_KEY)
            const isFoundUser = await User.findOne({where: {id: user_access.id}})

            if (isFoundUser) {
                req.currentUser = {
                    email: isFoundUser.email,
                    UserId: isFoundUser.id
                }
                next()
            } else {
                throw UniversalErrorResponse(400, "Invalid", "Please Register first")
            }

        }

    } catch (error) {
        res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
    }
}

module.exports = { authLogin }