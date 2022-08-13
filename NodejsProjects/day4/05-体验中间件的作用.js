const express = require('express')
const app = express();

//所有中间件和最终的响应回调函数的req和res是共享的！！！可以任意赋新值
app.use(function (req, res, next) {
    req.startTime = Date.now();
    console.log('No.1 middleware startTime is' + req.startTime);
    next();
})

app.use(function (req, res, next) {
    req.startTime = Date.now();
    console.log('No.2 middleware startTime is' + req.startTime);
    next();
})

// 即便没有匹配到这个路由，它前面的中间件也会照常执行
app.get('/user', (req, res) => {
    res.send('Finally startTime is' + req.startTime);
})


app.listen(80, () => {
    console.log('server is running at 127.0.0.1:80');
})