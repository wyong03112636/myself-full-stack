const {insert, findOne} = require('../models/register');
const { hash, compare } = require('../utils/tools')

const register = async function(req, res, next) {
  res.set('Content-Type', 'application/json;charset=utf-8')
    let {username, password, retype} = req.body;
    let bcrypt_password = await hash(password);
    let bcrypt_retype = await hash(retype)
    let result = await insert({
      username,
      password:bcrypt_password,
      retype:bcrypt_retype
    })
    if(result){
        res.render('succ', {
            data:JSON.stringify({
              message:'用户注册成功'
            })
        })
    }
}
const hasSame = async function(req, res, next){
  res.set('Content-Type', 'application/json;charset=utf-8')
  let {username, password} = req.body;
  let result = await findOne({username});
  if(result){
    res.render('fail', {
      data:JSON.stringify({
        message:'该用户已注册'
      })
    })
  }else{
    next();
  }
}

const login = async function(req, res, next) {
  res.set('Content-Type', 'application/json;charset=utf-8')
  let {username,password} = req.body
  let result = await findOne({username})
  if(result){
    let Compareresult = await compare(password , result.password)
    if (Compareresult) {
      res.render('succ', {
        data:JSON.stringify({
          message:'用户登录成功',
          name:username
        })
      })
    }
  }else{
    res.render('fail', {
      data:JSON.stringify({
        message:'用户账号密码不正确'
      })
    })
  }
}

module.exports = {
    register,
    login,
    hasSame
}