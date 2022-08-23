const express = require('express');
const app = express();

const mysql = require('mysql')

// 创建连接池
const db = mysql.createPool({
    host: '127.0.0.1',       //mysql服务器的ip
    user: 'root',            //登录mysql的账号
    password: 'jiabin+0.0123',  //密码
    database: 'my_db_01'     //要链接的数据库
})

// app.get('/', (req, res) => {
//     throw new Error('抛出错误');
// })

const sqlStr = 'selet * from ev_users where username=?';
db.query(sqlStr, 'jiabin', (err, result) => {
    if (err) {
        // return console.log(err.message);
        // throw new Error('抛出错误');
    }
})

app.use((err, req, res, next) => {
    console.log('触发错误级别中间件' + err.message);
})


app.listen(80, () => {
    console.log('sssssss');
})