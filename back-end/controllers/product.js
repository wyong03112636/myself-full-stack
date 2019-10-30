const productModel = require('../models/product', );
const moment = require('moment')
const {
  verifyToken,
} = require("../utils/tools")
const findAll = async (req, res, next) => {
  res.set("Content-Type", "application/json; charset=utf-8");
  let result = await productModel.findAll();
  if (result) {
    res.render("succ", {
      data: JSON.stringify({
        list: result,
      }),
    })
  } else {
    res.render("fail", {
      data: JSON.stringify({
        list: [],
      }),
    })
  }
}
const isLogin = async function (req, res, next) {
  res.set("Content-Type", "application/json;charset=utf-8");
  let token = req.get("X-Access-Token")
  if (token) {
    let decoded = await verifyToken(token);
    if (decoded)
      next();
  } else {
    res.render("fail", {
      data: JSON.stringify({
        message: "token验证失败",
      }),
    });
  }
};
const saveData = async function (req, res, next) {
  res.set("Content-Type", "application/json;charset=utf-8");
  let data = req.body;
  let result = await productModel.save(data);
  if (result) {
    res.render("succ", {
      data: JSON.stringify({
        message: "数据插入成功",
      }),
    });
  } else {
    res.render("fail", {
      data: JSON.stringify({
        message: "数据插入失败",
      }),
    });
  }
}

const upData = async function (req, res, next) {
  res.set("Content-Type", "application/json;charset=utf-8");
  let data = req.body;
  data.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
  let result = await productModel.upData(data);
  if (result) {
    res.render("succ", {
      data: JSON.stringify({
        message: "数据修改成功",
      }),
    });
  } else {
    res.render("fail", {
      data: JSON.stringify({
        message: "数据修改失败",
      }),
    });
  }

}

const findOne = async function (req, res, next) {
  res.set("Content-Type", "application/json;charset=utf-8");
  let id = req.query.id;
  let result = await productModel.findOne(id);
  if (result) {
    res.render("succ", {
      data: JSON.stringify(result),
    });
  } else {
    res.render("fail", {
      data: JSON.stringify(result),
    });
  }
}

const remove = async function (req, res, next) {
  res.set("Content-Type", "application/json;charset=utf-8");
  let id = req.body.id;
  let result = productModel.remove(id);
  if (result) {
    res.render("succ", {
      data: JSON.stringify({
        message: "数据删除成功",
      }),
    });
  } else {
    res.render("fail", {
      data: JSON.stringify({
        message: "数据删除失败",
      }),
    });
  }
}
module.exports = {
  findAll,
  isLogin,
  saveData,
  upData,
  findOne,
  remove
}