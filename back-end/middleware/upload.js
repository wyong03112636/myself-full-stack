const path = require('path')
const multer = require('multer')
const randomstring = require('randomstring')
const fs = require('fs');
var filename = '';
const mimetypeMap = {
  'image/png': '.png',
  'image/jpg': '.jpg',
  'image/jpeg': '.jpeg',
  'image/gif': '.gif'
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../public/uploads'))
  },

  filename: (req, file, cb) => {
    let {
      fieldname,
      mimetype
    } = file
    filename = fieldname + '-' + randomstring.generate(6) + mimetypeMap[mimetype]
    cb(null, filename)
  }
})
const upload = multer({
  storage
}).single('productimg')

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (filename) {
      fs.unlink(path.resolve(__dirname, '../public/uploads/' + req.body.tempImg), (err) => {
        if (err)
          console.log(err.message);
      })
    }
    req.filename = filename;
    filename = ''; //重置filename，不然下次提交会沿用上次的图片
    next()
  })
}