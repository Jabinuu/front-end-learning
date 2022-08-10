// 导入http模块
const http = require('http');
// 创建一个服务器实例
const server = http.createServer();

// 用http模块的.on方法绑定服务器与request事件
server.on('request', (req, res) => {
    console.log('Someone visit our web server.');
})

// 启动服务器,listen方法的参数1是端口号，意为当客户端的访问url里的端口号为80时，执行这段服务器的代码
server.listen(80, function () {
    console.log('server running at http://127.0.0.1:80');
    // 自己的电脑可以即是客户端又是服务器，我们可以通过127.0.0.1来访问本机的服务器形态
    // 127.0.0.1即是本机回送ip地址，域名为localhost，该地址用于把本机作为服务器时测试使用，
})

// 在vscode的终端里用ctrl + c退出程序