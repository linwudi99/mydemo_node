// 创建路由对象
const router = require("express").Router();

const passport = require("passport");
const Profile = require('../models/Profile');

router.post("/profiles/add", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  const newProfile = new Profile(req.body)
  newProfile.save().then(data => {
    res.json(data);
  }).catch(err => {
    console.log(err)
  })
  // res.json({
  //   code: 1,
  //   msg: "success",
  //   data: {
  //     id: req.user._id,
  //     name: req.user.name,
  //     email: req.user.email,
  //     roleId: req.user.roleId
  //   }
  // })
})

module.exports = router;