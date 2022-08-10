const http = require('http');
const server = http.createServer();

// req是请求对象，包含客户端相关的数据和信息
// res是响应对象，可以通过该对象的方法给客户端发送响应数据
server.on('request', (req, res) => {
    // req.url是客户端所请求的url地址
    const url = req.url;
    // req.url是客户端的请求类型 GET或POST
    const method = req.method;
    const str = `Your request url is ${url}, and request method is ${method}`;
    console.log(str);
    // 调用res.end()方法，向客户端发送响应数据，并结束对这次请求的处理
    res.end(str);
})

server.listen(80, function () {
    console.log('server running at http://127.0.0.1:80');

})