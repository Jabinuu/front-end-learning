const express = require('express');
const app = express();
const Joi = require('joi');
const expressJwt = require('express-jwt');  //用于服务器解析token字符串的包
const config = require('./config');

// 导入路由
const router = require('./router/user');
app.use(express.urlencoded({ extended: false }));    //解析请求体数据

// 为了避免多次调用send发送响应数据，比较臃肿，在res下挂载cc函数，把每次响应都封装在cc里，简化代码
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {    // status默认为1，即可选参数的写法
        res.send({
            status,
            msg: err instanceof Error ? err.message : err    // 因为响应的错误信息可能是自己设置的string，也可能是err对象的message属性
        })
    }
    next();
})

// .unless设置了url除了以/api为开头的都要进行身份验证
app.use(expressJwt({ secret: config.secretKey }).unless({ path: [/^\/api/] }));  //解析出来的用户信息挂载到req.user下，生成token时用的什么信息，解析出来就是什么

app.use('/api', router);   //注册路由全局中间件，前缀一定要写/xxx

// 注册错误级别的中间件，识别验证用户名密码时throw的error（错误级别的中间件是写在路由之后的，这是特例）
app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) {
        return res.cc(err)
    }
    // 捕获expressJwt的error
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份验证失败！')
    }
    res.cc(err);
})

app.listen(3007, () => {
    console.log('this server is running at 127.0.0.1:3007');
})