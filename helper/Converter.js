class Converter {
    static convertJson(parameter){
        return JSON.parse(JSON.stringify(parameter))
    }
}

module.exports = Converter