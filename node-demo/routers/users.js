const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require('../models/User');
// 创建路由对象
const router = express.Router();

// 注册
router.post('/register', (req, res) => {
  const newUser = new User(req.body)
  // 查询数据库是否存在该用户
  User.findOne({ name: req.body.name }).then((user) => {
    if (user) {
      // 定义code--->1:成功，0:无数据，-1:失败
      return res.status(400).json({
        code: -1,
        msg: '该用户已存在，请重新注册！'
      })
    } else {
      // 密码加密
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => {
            res.json({
              code: 1,
              msg: '注册成功！'
            })
          }).catch(err => {
            console.log(err)
          })
        })
      })
    }
  })
})

// 登录 返回token jwt passport
router.post('/login', (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  // 查询数据库是否存在该用户
  User.findOne({
    name
  }).then((user) => {
    if (!user) {
      return res.status(404).json({
        code: -1,
        msg: '该用户不存在，请重新登录！'
      })
    } else {
      // 检查密码是否匹配
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // 登录成功并生成token          
          // jwt.sign("规则","加密名字","过期时间","箭头函数")
          const rule = {
            id: user._id,
            name: user.name,
            email: user.email,
            roleId: user.roleId
          }
          jwt.sign(rule, "secret", { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              code: 1,
              msg: "登录成功！",
              token:"Bearer " + token
            })
          })
        } else {
          return res.status(400).json({
            code: -1,
            msg: "密码错误，登录失败！"
          })
        }
      })
    }
  })
})

// 验证token是否合法  passport：passport.js文件中获取来的数据
router.get("/verifyToken",passport.authenticate("jwt",{session:false}),(req,res)=>{
  res.json({
    code:1,
    msg:"success",
    data:{
      id:req.user._id,
      name: req.user.name,
      email: req.user.email,
      roleId: req.user.roleId
    }
  })
})


module.exports = router;