// 路由处理函数模块
const db = require('../db/index');      //自定义模块
const bctyptjs = require('bcryptjs');   //加密npm包
const jwt = require('jsonwebtoken');    //用于生成token的包
const config = require('../config');

module.exports.reguser = (req, res) => {
    const userinfo = req.body;
    // 检查用户名或密码是否为空（不合法）

    // if (!userinfo.username || !userinfo.password) {
    //     // return res.send({ status: 1, msg: '用户名或密码不合法！' });
    //     return res.cc('用户名或密码不合法！');
    // }



    // 检查用户名在数据库中有没有重复
    const sqlStr = 'select * from ev_users where username=?';
    db.query(sqlStr, userinfo.username, (err, result) => {
        if (err) {
            // return res.send({ status: 1, msg: err.message });
            return res.cc(err);
        }
        if (result.length > 0) {
            // res.send({ status: 1, msg: '用户名被占用，请重新输入用户名！' })
            return res.cc('用户名被占用，请重新输入用户名！')
        }

        // 对密码进行加密
        userinfo.password = bctyptjs.hashSync(userinfo.password, 10);

        // 加入新用户
        const sql = 'insert into ev_users set ?';
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, result) => {
            if (err) {
                // return res.send({ status: 1, msg: err.message });
                return res.cc(err);
            }
            // 影响行数是否为1（是否插入成功）
            if (result.affectedRows !== 1) {
                // return res.send({ status: 1, msg: '注册用户失败！' });
                return res.cc('注册用户失败！');
            }
            // res.send({ status: 0, msg: '用户注册成功！' });
            res.cc('用户注册成功！', 0);
        })
    })
}

module.exports.login = (req, res) => {
    const userinfo = req.body;
    const sqlStr = 'select * from ev_users where username = ?';
    db.query(sqlStr, userinfo.username, (err, results) => {
        // sql语句未能正常执行
        if (err) {
            return res.cc(err);
        }
        // 如果sql语句正常执行，但获取到的数据行数不为1
        if (results.length !== 1) {
            return res.cc('用户登录失败！')
        }

        // 如果用户存在，那么接下来验证密码 
        const checkResult = bctyptjs.compareSync(userinfo.password, results[0].password);  //直接明文和加密文比较即可
        if (!checkResult) {
            return res.cc('密码错误！请重新输入。')
        }

        // 密码验证通过，生成该用户token并发客户端浏览器，存放在localstorage中
        const modified_userinfo = { ...results[0], password: '', userinfo: '' };   //es6 ...表示展开对象，后面是对该对象的属性进行修改并覆盖
        // 由于token是发送到客户端的，而客户端容易被黑客攻击，所以密码和头像这种敏感信息要在生成token前剔除掉
        const token = jwt.sign(modified_userinfo, config.secretKey, { expiresIn: config.expiresIn });
        res.send({
            status: 0,
            msg: '登录成功！',
            token: 'Bearer ' + token
        })
    })
}