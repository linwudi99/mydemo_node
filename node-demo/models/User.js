const mongoose = require("mongoose");

// 设置数据模式并创建数据模型类
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  // 角色权限 1-管理员，0-普通用户
  roleId: {
    type: Number,
    default: 0
  }
})

module.exports = User = mongoose.model('users', userSchema)