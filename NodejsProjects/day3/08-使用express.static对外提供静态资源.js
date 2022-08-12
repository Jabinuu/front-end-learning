// 对外提供静态资源意思很简单，就是用户在url里写某个文件，我就能在浏览器里访问到这个文件（参考访问网页html文件的过程）
const express = require('express');
const app = express();

// 1.默认托管静态资源，url里面写127.0.0.1/xxxx就能访问到files文件夹里的文件，url里不需要写files文件夹了
app.use(express.static('files'));

// 2.挂载虚拟前缀，url里写/jiabin/index.css才能访问到，这样就实现了在url里把clock换成jia才能访问
app.use('/jia', express.static('clock'));
// 在托管多个文件夹的时候，如果要访问index.html，而多个文件夹里均有index.html，那么只访问第一个托管的文件夹里的

app.listen(80, () => {
    console.log('服务器运行在127.0.0.1:80上');
})