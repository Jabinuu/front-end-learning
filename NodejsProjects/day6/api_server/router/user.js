const express = require('express');
const myrouter = express.Router();
const user_handler = require('../router_handler/user');
const expressJoi = require('@escook/express-joi');   //验证用户名密码是否合规的中间件
const { reguser_Schema } = require('../schema/user');   //导入验证规则

// 路由里的url是/ 而不是./ ，一定要写
myrouter.post('/reguser', expressJoi(reguser_Schema), user_handler.reguser)

myrouter.post('/login', expressJoi(reguser_Schema), user_handler.login);

module.exports = myrouter;