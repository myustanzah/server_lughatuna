const BaseController = require("./baseController");
const jwt = require('jsonwebtoken')
const { User, Students, Areas } = require('../models/index');
const { UniversalResponse, UniversalErrorResponse } = require("../helper/universalResponse");
const { decryptPass, encryptPass } = require("../helper/crypto");
const Converter = require("../helper/Converter");


class AccountController extends BaseController{
    static async index(req, res){
        try {
            const users = await User.findAll({
                order: [['id', 'DESC']]
            })
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
                kodeUser: +kode_user,
                imgProfil: img_profil,
                descriptions: descriptions
            }
            
            const findUser = await User.findOne({where: {email: email}})
            if (findUser) 
                throw UniversalErrorResponse(500, "User already exist", findUser)

            let responseCreateUser = await User.create(inputUser)
            
            res.status(200).json(UniversalResponse(200, "OK", responseCreateUser))

        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }

    static async editUser(req, res){
        try {

            const { name, email, descriptions, address, city, postalCode } = req.body
            
            let findUser = await User.findByPk(+req.params.id)

            if (!findUser) 
                throw UniversalErrorResponse(401, "User Not Found", findUser)

            findUser.name = name
            findUser.email = email
            findUser.descriptions = descriptions
            findUser.address = address
            findUser.city = city
            findUser.postalCode = postalCode

            const userConvert = Converter.convertJson(findUser)
            const userAfterUpdate = await findUser.update(userConvert)

            if(!userAfterUpdate)
                throw UniversalErrorResponse(500, "Internal Server Error", userAfterUpdate)

            res.status(201).json(UniversalResponse(201, "OK", userAfterUpdate))
            
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }

    static async deleteUser(req, res){
        try {
            let findUser = await User.findByPk(+req.params.id)

            if (!findUser) 
                throw UniversalErrorResponse(401, "User Not Found", findUser)

            findUser.suspend = true

            const userConvert = Converter.convertJson(findUser)
            const userAfterUpdate = await findUser.update(userConvert)

            res.status(201).json(UniversalResponse(201, "OK", userAfterUpdate))
            
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }

    static async resetPassword(req, res){
        try {
            const { email, newPassword, confirmPassword } = req.body

            if (newPassword !== confirmPassword) 
                throw UniversalErrorResponse(500, "Internal Server Error", "Your password invalid")

            let findUser = await User.findOne({where: {email: email}})
            if(!findUser)
                throw UniversalErrorResponse(401, "User Not Found", findUser)
            
            findUser.password = encryptPass(newPassword, 8)

            const userConvert = Converter.convertJson(findUser)
            const userAfterUpdate = await findUser.update(userConvert)

            res.status(201).json(UniversalResponse(201, "OK", userAfterUpdate))

        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }

}

module.exports = AccountController