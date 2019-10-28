var express = require("express");
var router = express.Router();
const {
  register,
  login,
  hasSame,
  isLogin,
  logout
} = require("../controllers/users");

/* GET users listing. */
router.post("/login", login);
router.post("/register", hasSame, register);
router.get("/islogin", isLogin);
router.get("/logout", logout);
module.exports = router;