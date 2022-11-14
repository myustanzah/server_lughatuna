const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/student')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,  uniqueSuffix + "." + getExtentionFile(file.type ? file.type : file.mimetype))
    }
})

function getExtentionFile(name){
    let newNameExt = name.split('/')[1]
    return newNameExt
}

const upload = multer({ storage: storage })

module.exports = upload
