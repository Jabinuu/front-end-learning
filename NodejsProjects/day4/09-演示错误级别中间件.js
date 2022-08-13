// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1. 定义路由
app.get('/', (req, res) => {
    // 1.1 人为的制造错误，捕获到错误之后，马上跳转到错误级别中间件
    throw new Error('服务器内部发生了错误！')
    res.send('Home page.')
})

// 2. 定义错误级别的中间件（必须是4个参数），捕获整个项目的异常错误，从而防止程序的崩溃
//     错误级别中间件一定要注册在所有路由之后，这是一个特例。其他的中间件都是在路由之前注册的
app.use((err, req, res, next) => {
    console.log('发生了错误！' + err.message)
    res.send('Error：' + err.message)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
    console.log('Express server running at http://127.0.0.1')
})
