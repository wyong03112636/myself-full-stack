const path = require('path')
const multer = require('multer')
const randomstring = require('randomstring')
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
  console.log(filename)
  upload(req, res, (err) => {
    req.filename = filename
    next()
  })
}