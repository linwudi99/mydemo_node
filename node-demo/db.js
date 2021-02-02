const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userdb", {
  useNewUrlParser: true, useUnifiedTopology: true
});

//用js中原生的Promise替代mongoose中被废弃的promise;
// mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on("open",() => {
  console.log("数据库连接成功。。。")
})
db.on("err",(err) => {
  console.log(err)
})

// 设置数据模式并创建数据模型类
const userSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
  },   
  email:{
    type:String,
  },
  password:{
    type: String,
    required: true,
  },
  createDate:{
    type: Date,
    default:Date.now
  },
  // 角色权限 1-管理员，0-普通用户
  roleId:{
    type: Number,
    default: 0
  }
})

const User = mongoose.model('users',userSchema)

module.exports = {User}