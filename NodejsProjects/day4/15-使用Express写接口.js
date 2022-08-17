const express = require('express')
const app = express();
const router = require('./16-apiRouter');

app.use(express.urlencoded({ extended: false }));  //解析x-www-urlencoded格式的请求体
app.use(express.json());             //解析json格式的请求体

app.use('/api', router);


app.listen(80, () => {
    console.log('This server is running at 127.0.0.1');
})