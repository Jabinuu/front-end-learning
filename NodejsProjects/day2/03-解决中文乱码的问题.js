const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
    const url = req.url;
    const method = req.method;
    const str = `您请求的url为 ${url}, 请求类型为 ${method}`;
    console.log(str);
    // 当发送给客户端的数据中有中文时，在客户端浏览器中会乱码（但postcode中不乱码），所以要设置content-type
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end(str);
})

server.listen(80, function () {
    console.log('server running at http://127.0.0.1:80');

})