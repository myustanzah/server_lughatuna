

class BaseController {
    static async getData(req, res){
        try {
            res.status(200).json("OK");
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = BaseController