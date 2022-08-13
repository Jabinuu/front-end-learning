const express = require('express')
const app = express();

const mw = function (req, res, next) {
    console.log('中间件函数1');
    next();  //结尾一定要调用next，否则就断链了
};

// use函数的作用就是注册全局中间件
app.use(mw);

app.use(function (req, res, next) {
    console.log('中间件函数2');
    next();
})

app.get('/', (req, res) => {
    console.log('get到/ 路由');
    res.send('get到/ 路由')
})


app.listen(80, () => {
    console.log('server is running at 127.0.0.1:80');
})