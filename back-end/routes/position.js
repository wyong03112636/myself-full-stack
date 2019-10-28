var express = require('express')
var router = express.Router()

let position = require('../controllers/positon')

router.get('/findAll', position.isLogin, position.findAll)

module.exports = router