const {
  insert,
  findOne
} = require("../models/operation");
const {
  hash,
  compare,
  generateToken,
  verifyToken
} = require("../utils/tools");

const register = async function (req, res, next) {
  res.set("Content-Type", "application/json;charset=utf-8");
  const {
    username,
    password,
    retype
  } = req.body;
  const bcrypt_password = await hash(password);
  const bcrypt_retype = await hash(retype);
  const result = await insert({
    username,
    password: bcrypt_password,
    retype: bcrypt_retype
  });
  if (result) {
    res.render("succ", {
      data: JSON.stringify({
        message: "用户注册成功"
      })
    });
  }
};
const hasSame = async function (req, res, next) {
  res.set("Content-Type", "application/json;charset=utf-8");
  const {
    username,
    password
  } = req.body;
  const result = await findOne({
    username
  });
  if (result) {
    res.render("fail", {
      data: JSON.stringify({
        message: "该用户已注册"
      })
    });
  } else {
    next();
  }
};

const login = async function (req, res, next) {
  res.set("Content-Type", "application/json;charset=utf-8");
  const {
    username,
    password
  } = req.body;
  const result = await findOne({
    username
  });
  if (result) {
    const Compareresult = await compare(password, result.password);
    if (Compareresult) {
      let token = await generateToken(username);
      res.set('X-Access-Token', token)
      res.render("succ", {
        data: JSON.stringify({
          message: "用户登录成功",
          name: username
        })
      });
    }
  } else {
    res.render("fail", {
      data: JSON.stringify({
        message: "用户账号密码不正确"
      })
    });
  }
};
const isLogin = async function (req, res, next) {
  res.set("Content-Type", "application/json;charset=utf-8");
  let token = req.get('X-Access-Token');
  let decoded = await verifyToken(token);
  if (token) {
    res.render("succ", {
      data: JSON.stringify({
        message: "用户已有登录权限",
        username: decoded.username,
      })
    });
  } else {
    res.render("fail", {
      data: JSON.stringify({
        message: "没有权限"
      })
    });
  }
};
const logout = function (req, res, next) {
  res.set("Content-Type", "application/json;charset=utf-8");
  req.session = null;
  res.render("succ", {
    data: JSON.stringify({
      message: "注销成功"
    })
  });
};

module.exports = {
  register,
  login,
  hasSame,
  isLogin,
  logout
};