const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

// DB config
const dbUrl = require("./config/dbUrl").dbUrl;
// 连接数据库
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
  console.log("数据库连接成功。。。")
}).catch(err=>{
  console.log(err)
})

app.use(express.static('www'));
app.use(bodyParser.urlencoded({extended:false}));
// 初始化passport
app.use(passport.initialize());
// 配置passport
require("./config/passport")(passport);

// 导入路由模块，作为中间件使用
app.use(require("./routers/users"));
app.use(require("./routers/profiles"));

app.listen(3001,()=>{
  console.log('服务启动，端口号3001...')
})