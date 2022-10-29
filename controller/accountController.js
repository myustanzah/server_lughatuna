const BaseController = require("./baseController");


class AccountController extends BaseController{
    static async login(req, res) {
        try {
            let inputPayload = {
                email : req.body.email,
                password : req.body.password
            }
            res.status(200).json(inputPayload)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = AccountController