const express = require('express');
const server = express();

// 这其实就是给server服务器挂载了2条路由，这几条路由构成一个路由表
// 每条路由的结构： 请求类型，url |  下一条该转向的事件处理函数
// 当客户端发来请求时，服务器按照从上到下的顺序依次匹配各个路由，当请求类型和url均匹配到时，才跳至事件处理函数
server.get('/user', (req, res) => {
    res.send('当前是get请求');
})

server.post('/home', (req, res) => {
    res.send('当前是post请求');
})

server.listen(80, () => {
    console.log('server is running at 127.0.0.1:80');
})