class MedicalController{
    static async addMedical(req, res){
        res.status(201).json(UniversalResponse(201, "OK", "updateContact"));
    }
}

module.exports = MedicalController