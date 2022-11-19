const BaseController = require("./baseController");
const jwt = require('jsonwebtoken')
const { User, Students, Areas } = require('../models/index');
const { UniversalResponse, UniversalErrorResponse } = require("../helper/universalResponse");
const { decryptPass } = require("../helper/crypto");


class AccountController extends BaseController{
    static async index(req, res){
        try {
            const users = await User.findAll()
            res.status(200).json(UniversalResponse(200, "OK", users))

        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }
    static async login(req, res) {
        try {
            let inputPayload = {
                email : req.body.email,
                password : req.body.password
            }
            
            let response = {}
            if(!inputPayload.email || !inputPayload.password)
                throw UniversalErrorResponse(400, "please, input email or password")
            
            const checkAccountUser = await User.findOne(
                { 
                    where: { 
                        email: inputPayload.email 
                    }
                })
            
            if(!checkAccountUser || checkAccountUser.suspend === true)
                throw UniversalErrorResponse(400, "Invalid email or password")
            
            if(!decryptPass(inputPayload.password, checkAccountUser.password))
                throw UniversalErrorResponse(400, "Invalid email or password")


            response.token = jwt.sign({id: checkAccountUser.id, email: checkAccountUser.email}, process.env.PRIVATE_KEY)
            response.data = checkAccountUser

            res.status(200).json(UniversalResponse(200, "OK", response))
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }
    static async register(req, res){
        try {
            const { name, email, password, kode_user, img_profil, descriptions } = req.body

            let inputUser = {
                name: name,
                email: email,
                password: password,
                kodeUser: kode_user,
                imgProfil: img_profil,
                descriptions: descriptions
            }
            
            let responseCreateUser = await User.create(inputUser)
            
            res.status(200).json(UniversalResponse(200, "OK", responseCreateUser))

        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }

    // static async getDataUser(req, res){
    //     try {
    //         let { token } = req.body
    //         let response = {}

    //         const user_data = jwt.verify(token, process.env.PRIVATE_KEY)

    //         const checkAccountUser = await User.findOne(
    //             { 
    //                 where: { 
    //                     email: user_data.email 
    //                 },
    //                 include: {
    //                     all: true,
    //                     nested: true
    //                 }
    //             })
            
    //         response.data = checkAccountUser

    //         res.status(200).json(UniversalResponse(200, "OK", response))
            
    //     } catch (error) {
    //         res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
    //     }
    // }
}

module.exports = AccountController