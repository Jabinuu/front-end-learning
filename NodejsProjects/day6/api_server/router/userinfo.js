const express = require('express');
const myrouter = express.Router();
const routerHandler = require('../router_handler/userinfo');
const { updateSchema, updatePasswordSchema, avatarSchema } = require('../schema/user');
const expressJoi = require('@escook/express-joi');   //导入表单验证中间件

myrouter.get('/userinfo', routerHandler.getUserinfo);
myrouter.post('/userinfo', expressJoi(updateSchema), routerHandler.updateUserinfo);
myrouter.post('/updatepwd', expressJoi(updatePasswordSchema), routerHandler.updatePassword)
myrouter.post('/updateAvatar', expressJoi(avatarSchema), routerHandler.updateAvatar)
module.exports = myrouter;