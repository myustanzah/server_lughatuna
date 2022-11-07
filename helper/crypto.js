const bcrypt = require('bcryptjs')

const encryptPass = (pass, isRound) => {
    return bcrypt.hashSync(pass, isRound)
}

const decryptPass = (dePass, enPass) => {
    return bcrypt.compareSync(dePass, enPass)
}

module.exports = { encryptPass, decryptPass }