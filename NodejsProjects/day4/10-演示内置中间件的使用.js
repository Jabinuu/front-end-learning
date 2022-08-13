const express = require('express')
const app = express();

app.use(express.json());   //这个解析json格式的请求体
app.use(express.urlencoded({ extended: false }))  //这个解析x-www-urlencoded格式的请求体
app.post('/', (req, res) => {
    console.log(req.body);
    res.end('ok');
})
app.listen(80, () => {
    console.log('server is running at 127.0.0.1');
})