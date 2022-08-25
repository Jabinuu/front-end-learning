const express = require('express')
const app = express();
const router = require('./16-apiRouter');

app.use(express.urlencoded({ extended: false }));  //解析x-www-urlencoded格式的请求体
app.use(express.json());             //解析json格式的请求体


// 配置 JSONP 的接口，必须在配置 cors 中间件之前，
app.get('/api/jsonp', (req, res) => {
    // TODO: 定义 JSONP 接口具体的实现过程
    // 1. 得到函数的名称
    const funcName = req.query.callback
    // 2. 定义要发送到客户端的数据对象
    const data = { name: 'zs', age: 22 }
    // 3. 拼接出一个函数的调用
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    // 4. 把拼接的字符串，响应给客户端
    res.send(scriptStr)
})

// 一定要在路由之前，配置 cors 这个中间件，从而解决接口跨域的问题
const cors = require('cors')
app.use(cors())
app.use('/api', router);


app.listen(80, () => {
    console.log('This server is running at 127.0.0.1');
})