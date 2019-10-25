var express = require('express');
var router = express.Router();
const {register, login, hasSame, isLogin, logout} = require('../controllers/users')

/* GET users listing. */
router.post('/users/login', login);
router.post('/users/register',hasSame, register)
router.get('/users/islogin', isLogin);
router.get('/users/logout', logout);
module.exports = router;
