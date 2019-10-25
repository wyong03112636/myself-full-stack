var express = require('express');
var router = express.Router();
const {register, login, hasSame} = require('../controllers/users')

/* GET users listing. */
router.post('/users/login', login);
router.post('/users/register',hasSame, register)
module.exports = router;
