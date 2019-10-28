const {
  verifyToken
} = require('../utils/tools')
const findAll = (req, res, next) => {
  res.set('Content-Type', 'application/json; charset=utf-8')
  res.render('succ', {
    data: JSON.stringify({
      list: []
    })
  })
}
const isLogin = async function (req, res, next) {
  res.set("Content-Type", "application/json;charset=utf-8");
  let token = req.get('X-Access-Token')
  if (token) {
    let decoded = await verifyToken(token);
    if (decoded)
      next();
  } else {
    res.render("fail", {
      data: JSON.stringify({
        message: "token验证失败"
      })
    });
  }
};
module.exports = {
  findAll,
  isLogin
}