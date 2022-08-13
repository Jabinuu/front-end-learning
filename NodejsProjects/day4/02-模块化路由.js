const express = require('express');
const myrouter = require('./03-router');   // 导入模块化的路由
const app = express();

// 将路由挂载到服务器 ,参数1是自定义的虚拟前缀
app.use('/api', myrouter);

app.listen(80, () => {
    console.log('server is running at 127.0.0.1:80');
})