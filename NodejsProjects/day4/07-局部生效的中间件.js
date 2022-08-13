const express = require('express');
const app = express()

const mw1 = (req, res, next) => {
    console.log('i am middleware 1');
    next();
}

app.get('/', (req, res) => {
    res.end('home page')
});

// 局部中间件的含义：仅在这个路由里起作用的中间件。定义方法如下
app.get('/user', mw1, (req, res) => {
    res.end('user page')
})

app.listen(80, () => {
    console.log('servver is running at 127.0.0.1:80');
})