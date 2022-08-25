// 路由处理函数模块
const db = require('../db/index');
const bcrypt = require('bcryptjs');

exports.getUserinfo = (req, res) => {
    const sqlStr = 'select username, id, nickname, email, user_pic from ev_users where username = ?';
    db.query(sqlStr, req.user.username, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.length !== 1) {
            return res.cc('获取用户信息失败！')
        }
        res.send({
            status: 0,
            msg: '获取用户信息成功！',
            data: results[0]
        })
    })
}

exports.updateUserinfo = (req, res) => {
    const sqlStr = 'update ev_users set ? where id = ?';
    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('更新数据失败！');
        res.cc('更新用户基本信息成功！', 0);
    })
}

exports.updatePassword = (req, res) => {
    // 先查询用户是否存在
    const sqlStr = 'select * from ev_users where username = ?';
    db.query(sqlStr, req.user.username, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('用户不存在！');
        const isSame = bcrypt.compareSync(req.body.oldPwd, results[0].password);
        if (!isSame) return res.cc('原密码错误！');
        const sql = 'update ev_users set ? where username = ?';
        const newPwd = bcrypt.hashSync(req.body.newPwd);
        db.query(sql, [{ password: newPwd }, req.user.username], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('重置密码失败！');
            res.cc('重置密码成功！', 0)
        })
    })
}

exports.updateAvatar = (req, res) => {
    const sqlStr = 'update ev_users set user_pic = ? where username = ?';
    db.query(sqlStr, [req.body.avatar, req.user.username], (err, results) => {
        if (err) return res.cc(err);
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新头像失败！');
        return res.cc('更新头像成功！', 0)
    });
}