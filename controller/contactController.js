const { Contact, Students } = require('../models/index');
const Converter = require('../helper/Converter');
const { UniversalResponse, UniversalErrorResponse } = require('../helper/universalResponse');

class ContactController {
    static async addContact(req, res){
        const { studentId } = req.params
        const {firstName, lastName,
            relationship, comment,
            homePhone, mobilePhone,
            email, homeAddress, city,
            state, postalCode, workAddress,
            cityWork, stateWork, postalCodeWork
        } = req.body
        try {
            const findStudent = await Students.findByPk(+studentId)
            if(!findStudent)
            throw UniversalErrorResponse(404, "Student Not Found", findStudent)

            const newContact = await Contact.create({
                StudentId: +studentId, firstName, lastName, relationship, comment,
                homePhone, mobilePhone, email, homeAddress, city, state,
                postalCode, workAddress, cityWork, stateWork, postalCodeWork
            })

            if(!newContact || Converter.convertJson(newContact) === {})
                throw UniversalErrorResponse(500, "Something wrong", newContact)
            
            res.status(200).json(UniversalResponse(200, "OK", newContact));
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content));
        }
    }
}

module.exports = ContactController