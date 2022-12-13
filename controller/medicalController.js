const Converter = require('../helper/Converter');
const { UniversalErrorResponse, UniversalResponse } = require('../helper/universalResponse');
const {  Medical, Students } = require('../models/index');


class MedicalController{
    static async addMedical(req, res){
        try {
            const { studentId } = req.params
            const { data } = req.body

            const findStudent = await Students.findByPk(+studentId)
            if(!findStudent)
                throw UniversalErrorResponse(404, "Student Not Found", findStudent)
            
            let findMedical = await Medical.findOne({where: { StudentId: findStudent.id }})
            if (!findMedical) {
                console.log("Create New Medical")

                let assignData = {
                    StudentId: findStudent.id,
                    medicalCode: +data.medicalCode,
                    name: data.name,
                    phone: data.phone,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    postalCode: data.postalCode,
                    insuranceProvider: data.insuranceProvider,
                    insuranceNumber: data.insuranceNumber,
                    notes: data.notes
                }

                const newMedical = await Medical.create(assignData)

                if(!newMedical || Converter.convertJson(newMedical) === {})
                    throw UniversalErrorResponse(500, "Something wrong", newMedical)
                else
                    res.status(200).json(UniversalResponse(200, "OK", newMedical));
                
            } else {
                console.log("Update Medical")

                findMedical.medicalCode = +data.medicalCode
                findMedical.name = data.name
                findMedical.phone = data.phone
                findMedical.address = data.address
                findMedical.city = data.city
                findMedical.state = data.state
                findMedical.postalCode = data.postalCode
                findMedical.insuranceProvider = data.insuranceProvider
                findMedical.insuranceNumber = data.insuranceNumber
                findMedical.notes = data.notes

                const medicalConvert = Converter.convertJson(findMedical)
                const updateMedical = await findMedical.update(medicalConvert)

                res.status(201).json(UniversalResponse(201, "OK", updateMedical));
            }
            
        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content));
        }
    }
}

module.exports = MedicalController