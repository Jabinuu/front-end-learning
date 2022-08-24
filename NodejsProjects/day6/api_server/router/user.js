const express = require('express');
const myrouter = express.Router();
const routerHandler = require('../router_handler/user');
const expressJoi = require('@escook/express-joi');   //验证表单数据的中间件
const { reguserSchema } = require('../schema/user');   //导入验证规则

// 路由里的url是/ 而不是./ ，一定要写
myrouter.post('/reguser', expressJoi(reguserSchema), routerHandler.reguser)
myrouter.post('/login', expressJoi(reguserSchema), routerHandler.login);
module.exports = myrouter;