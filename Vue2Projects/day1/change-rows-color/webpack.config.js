const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlPlugin({   //该插件负责将src里的index.html复制一份到项目根目录里，从而打开链接就是网页
    template: './src/index.html',
    filename: './index.html'
});

module.exports = {
    entry: path.join(__dirname, './src/index.js'),     //entry是入口，即webpack脚本要处理的文件路径，默认是./src/index.js
    output: {                                          //ouput设置经webpack脚本处理后的文件存放在什么位置 ，默认是./dist/main.js
        path: path.join(__dirname, './dist'),   //存放的目录
        filename: 'bundle.js'    //存放的文件名
    },
    plugins: [htmlPlugin],  //plugins数组里面存放各个插件
    devServer: {
        open: true,   // 首次打包后自动打开浏览器
        port: 80,      // 还可以自定义端口号
        host: '127.0.0.1'   // 也可以用设置为ip取代默认的域名访问网页
    },
    module: {
        // 这里定义了不同类型的loader
        rules: [
            //实现用loader协助webpack把css文件也打包到boudle.js文件中，因为webpack自己只会打包js文件
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // 用loader协助webpack把img文件导入并转为base64字符串，limit表示<22229字节的图片才转base64，大图片不转，因为体积会变大
            { test: /\.png|jpg|gif$/, use: ['url-loader?limit = 22229'] }
        ]
    },
    mode: 'production'    //意为当前项目所处模式是什么，如果是在开发阶段则设置为development，如果处于项目上线阶段则设置为production
}

// development的打包速度快，但是体积大。由于开发时追求打包速度快，所以用dev
// production的打包体积小，但是速度慢。由于项目上线追求代码体积小，所以用pro。体积小是因为会把代码压缩处理