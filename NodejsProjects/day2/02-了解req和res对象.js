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

    // send()和end()都会结束当前的响应流程，不同的是，send可接受buffer，string，object，array；而end只能接受buffer和string。
    // 而且send可设置并且默认的header的Content-Type为 html/text;charset:utf8格式，所以中文并不会乱码；而end则没有这些，中文会乱码
    // 综上，有数据响应时就用ssend，没数据响应时就用end
    res.send(str);
})

server.listen(80, function () {
    console.log('server running at http://127.0.0.1:80');

})