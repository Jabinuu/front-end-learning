// 路由处理函数模块
const db = require('../db/index');

exports.getArticleCates = (req, res) => {
    const sqlStr = 'select * from ev_article_cate where is_delete = 0 order by id';
    db.query(sqlStr, (err, results) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            msg: '获取文章分类列表成功！',
            data: results
        })
    })
}

exports.addArticleCates = (req, res) => {
    const articateinfo = req.body;
    const sqlStr = 'insert into ev_article_cate set ?';
    const sql = 'select * from ev_article_cate where name = ? or alias = ?';
    const data = { name: articateinfo.name, alias: articateinfo.alias };

    db.query(sql, [articateinfo.name, articateinfo.alias], (err, results) => {
        if (err) return res.cc(err);
        // 验证是类名和别名否已被占用
        if (results.length == 2) return res.cc('类名和别名都被占用，请重新输入！');
        if (results.length == 1 && results[0].name == articateinfo.name && results[0].alias == articateinfo.alias) return res.cc('类名和别名都被占用，请重新输入！')
        if (results.length == 1 && results[0].name == articateinfo.name) return res.cc('类名被占用，请重新输入！');
        if (results.length == 1 && results[0].alias == articateinfo.alias) return res.cc('别名被占用，请重新输入！');
        db.query(sqlStr, data, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.send('新增文章类型失败！');
            res.cc('新增文章类型成功！', 0);
        });
    });

}

exports.deleteArticleCates = (req, res) => {
    const sqlStr = 'update ev_article_cate set is_delete = 1 where id  = ?'
    // req.params是url动态参数
    db.query(sqlStr, req.params.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('删除数据失败！')
        res.cc('删除数据成功！', 0)
    })
}

exports.getArticleCatesById = (req, res) => {
    const sqlStr = 'select * from ev_article_cate where id = ?';
    db.query(sqlStr, req.params.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('查询失败！');
        res.send({
            status: 0,
            msg: '查询类名成功！',
            data: results[0]
        })
    })
}

exports.updateArticleCates = (req, res) => {
    const sql = 'select * from ev_article_cate where (name=? or alias =?) and id <> ?';
    const sqlStr = 'update ev_article_cate set ? where id = ?'
    const articateInfo = { name: req.body.name, alias: req.body.alias };
    db.query(sql, [req.body.name, req.body.alias, req.body.id], (err, results) => {
        if (err) return res.cc(err);
        // 验证是类名和别名否已被占用
        if (results.length == 2) return res.cc('类名和别名都被占用，请重新输入！');
        if (results.length == 1 && results[0].name == req.body.name && results[0].alias == req.body.alias) return res.cc('类名和别名都被占用，请重新输入！')
        if (results.length == 1 && results[0].name == req.body.name) return res.cc('类名被占用，请重新输入！');
        if (results.length == 1 && results[0].alias == req.body.alias) return res.cc('别名被占用，请重新输入！');
        db.query(sqlStr, [articateInfo, req.body.id], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更新数据失败！');
            res.cc('更新数据成功！', 0);
        })
    })

}