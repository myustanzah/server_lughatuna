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
            
            let findContact = await Contact.findOne({where: { StudentId: findStudent.id }})

            if(!findContact){
                console.log("Create New Contact")
                const newContact = await Contact.create({
                    StudentId: +studentId, firstName, lastName, relationship, comment,
                    homePhone, mobilePhone, email, homeAddress, city, state,
                    postalCode, workAddress, cityWork, stateWork, postalCodeWork
                })

                if(!newContact || Converter.convertJson(newContact) === {})
                    throw UniversalErrorResponse(500, "Something wrong", newContact)
                else
                    res.status(200).json(UniversalResponse(200, "OK", newContact));

            } else {

                console.log("Update Contact")

                findContact.firstName = firstName
                findContact.lastName = lastName
                findContact.relationship = relationship
                findContact.comment = homePhone
                findContact.mobilePhone = mobilePhone
                findContact.email = email
                findContact.homeAddress = homeAddress
                findContact.city = city
                findContact.state = state
                findContact.postalCode = postalCode
                findContact.workAddress = workAddress
                findContact.cityWork = cityWork
                findContact.stateWork = stateWork
                findContact.postalCodeWork = postalCodeWork

                const contactConvert = Converter.convertJson(findContact)
                const updateContact = await findContact.update(contactConvert)

                res.status(201).json(UniversalResponse(201, "OK", updateContact));
            } 
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content));
        }
    }

    static async uploadProfile(req, res){
        const { id } = req.params
        const imgProfil = req.file.filename
        try {
            const contact = await Contact.findByPk(+id)
            if(!contact)
                throw UniversalErrorResponse(400, "Contact Not Found", contact)
            
                const updateProfile = await Contact.update({imgProfil}, {
                    where: {
                        id: +id
                    },
                    returning: true,
                    raw: true
                })
            
                if (updateProfile[0] !== 1) 
                throw UniversalErrorResponse(500, "Internal Server Error", updateProfile)
            
                res.status(201).json(UniversalResponse(201, "Created", {imgProfil: updateProfile[1][0].imgProfil}))
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content))
        }
    }
}

module.exports = ContactController