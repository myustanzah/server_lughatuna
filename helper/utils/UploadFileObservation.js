const multer = require('multer')
const fs = require('fs');

const checkDirectory = './images/observation';

fs.stat(checkDirectory, (error, stats) => {
  if (error) {
    if (error.code === 'ENOENT') {
      console.log('Direktori observation tidak ada .');

      fs.mkdir(checkDirectory, (error) => {
        if (error) {
          console.error('Terjadi kesalahan saat membuat direktori:', error);
        } else {
          console.log('Direktori observation baru berhasil dibuat.');
        }
      });

    } else {
      console.error('Terjadi kesalahan saat memeriksa direktori:', error);
    }
  } else {
    if (stats.isDirectory()) {
      console.log('Direktori observation sudah ada.');
    } else {
      console.log('Path ini bukan sebuah direktori.');
    }
  }
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/observation')
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
