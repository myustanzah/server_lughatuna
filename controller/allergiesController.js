const Converter = require('../helper/Converter');
const { UniversalErrorResponse, UniversalResponse } = require('../helper/universalResponse');
const {  Allergy, Students } = require('../models/index');


class AllergiesController {
    static async addAlergies(req, res){
        try {
            const { studentId } = req.params
            const { data } = req.body

            const findStudent = await Students.findByPk(+studentId)
            if(!findStudent)
                throw UniversalErrorResponse(404, "Student Not Found", findStudent)

            let findAllergy = await Allergy.findOne({where: { StudentId: findStudent.id }})

            if (!findAllergy) {
                console.log("Create New Allergy")

                let assignData = {
                    StudentId: findStudent.id,
                    name: data.name,
                    anaphylactic: data.anaphylactic,
                    notes: data.notes
                }

                const newAllergy = await Allergy.create(assignData)

                if(!newAllergy || Converter.convertJson(newAllergy) === {})
                    throw UniversalErrorResponse(500, "Something wrong", newMedical)
                else
                    res.status(200).json(UniversalResponse(200, "OK", newAllergy));
                
            } else {
                console.log("Update Allergy")

                findAllergy.name = data.name
                findAllergy.anaphylactic = data.anaphylactic
                findAllergy.notes = data.notes

                const allergyConvert = Converter.convertJson(findAllergy)
                const updateMedical = await findAllergy.update(allergyConvert)

                res.status(201).json(UniversalResponse(201, "OK", updateMedical));
                
            }

        } catch (error) {
            res.status(error.status).json(UniversalErrorResponse(error.status, error.messages, error.content));
        }
    }
}

module.exports = AllergiesController