class AllergiesController {
    static async addAlergies(req, res){
        res.status(201).json(UniversalResponse(201, "OK", "updateContact"));
    }
}

module.exports = AllergiesController