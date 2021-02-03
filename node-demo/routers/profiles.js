// 创建路由对象
const router = require("express").Router();

const passport = require("passport");
const Profile = require('../models/Profile');
// 添加信息
router.post("/profiles/add", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  const newProfile = new Profile(req.body)
  newProfile.save((err,data)=>{
    // 定义code--->1:成功，0:无数据，-1:失败
    if (err) return res.json(err);
    res.json({ 
      code: 1, 
      msg: "success" 
    });
  })
})
// 获取所有信息和按条件查询
router.post("/profiles/list", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  Profile.find(req.body,(err,data)=>{
    if (err) return res.json(err);
    res.json({ 
      code: 1, 
      msg: "success", 
      data 
    });
  })
})
// 获取单个信息 by id
// router.get("/profiles/:id", passport.authenticate("jwt", {
//   session: false
// }), (req, res) => {
//   Profile.findOne({_id:req.params.id},(err,data)=>{
//     if (err) return res.json(err);
//     res.json({
//       code: 1,
//       msg: "success",
//       data
//     });
//   })
// })
// 编辑信息
router.post("/profiles/edit/:id", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  Profile.findOneAndUpdate(
    {_id:req.params.id},
    {$set: req.body},
    // {new: true},
    (err, data) => {
      if (err) return res.json(err);
      res.json({
        code: 1,
        msg: "success",
      });
    })
})
// 删除信息
router.delete("/profiles/delete/:id", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  Profile.findByIdAndRemove(req.params.id,(err,data)=>{
    if (err) return res.json(err);
    res.json({
      code: 1,
      msg: "success"
    });
  })
})

module.exports = router;