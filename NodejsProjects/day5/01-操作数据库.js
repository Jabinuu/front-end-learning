const mysql = require('mysql')

// 创建连接池
const db = mysql.createPool({
    host: '127.0.0.1',       //mysql服务器的ip
    user: 'root',            //登录mysql的账号
    password: 'jiabin+0.0123',  //密码
    database: 'my_db_01'     //要链接的数据库
})

// 查询数据
// select与语句返回的res是一个数组，元素是对象，每一个对象是一个数据行
db.query('select * from ev_users', (err, res) => {
    if (err) {
        return console.log(err.message);
    }
    console.log(res);
})

// 插入数据
// const user = { username: 'jiabin', password: 'jiabn789' };    //这里的key名一定要跟表的字段对应
// const sqlStr = 'insert into users set ?';      //这个写法与传统的有所不同，好处在于字段数目很多时，避免了过长的sql语句而很麻烦

// // 第二个参数就是要插入的数据对象，与sqlStr的？占位符遥相呼应
// db.query(sqlStr, user, (err, res) => {
//     if (err) {
//         return console.log(err.message);
//     }
//     if (res.affectedRows === 1) {
//         console.log('插入数据成功');
//     }
// })


//更新数据
// const user = { id: 6, username: 'zhangqing', password: 'zhangqing521' };
// const sqlStr = 'update users set ? where id = ?';
// // 两个？占位符，所以两项数据
// db.query(sqlStr, [user, user.id], (err, res) => {
//     if (err) {
//         return console.log(err.message);
//     }
//     if (res.affectedRows === 1) {
//         console.log('数据更新成功！');
//     }
// });


//删除数据
// const sqlStr = 'delete from users where id=?';
// db.query(sqlStr, 6, (err, res) => {    //6是占位符的值
//     if (err) {
//         return console.log(err.message);
//     }
//     if (res.affectedRows === 1) {
//         console.log('数据删除成功！');
//     }
// })


//标记删除（status字段）
// 工作中我们常用标记法，把status字段值更改为1，表示该数据不生效，模拟被删除。
// 因为直接delete删除数据比较危险，数据完全没有了。所以为了保险起见，要用标记删除， 还能复原
const sqlStr = 'update users set status=? where id=?'
// 意为把id为5的数据的status更改为1，即删除
db.query(sqlStr, [1, 5], (err, res) => {
    if (err) {
        return console.log(err.message);
    }
    if (res.affectedRows === 1) {
        console.log('删除数据成功！');
    }
})