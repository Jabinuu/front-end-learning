const express = require('express');
const router = express.Router();

// 当路由很多的时候，应当把路由信息模块化到另一个js文件里
router.get('/user', (req, res) => {
    res.end('当前是get请求');
})

router.post('/home', (req, res) => {
    res.end('当前是post请求');
})

// 记住，require永远是获得module.exports所指的对象，而不是exports，否则会报错
module.exports = router;
console.log(typeof router);  //这个类型其实是function也属于是对象类型，但不是基类Object对象。。。类似于string类型也是对象
// 为什么暴露出去的是function类型呢？因为app.use()函数的参数，必须是中间件，而中间件实质上就是一个function