const mongoose = require("mongoose");

// 设置数据模式并创建数据模型类
const profileSchema = mongoose.Schema({  
  type: {
    type: String,
  },
  desc: {
    type: String,
  },
  income: {
    type: Number,
  },
  extend: {
    type: Number,
  },
  cash: {
    type: Number,
  },
  remark: {
    type: String,
  },
})

module.exports = Profile = mongoose.model('profiles', profileSchema)