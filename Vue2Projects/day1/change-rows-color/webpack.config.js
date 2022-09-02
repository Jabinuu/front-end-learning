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
    mode: 'development'    //意为当前项目所处模式是什么，如果是在开发阶段则设置为development，如果处于项目上线阶段则设置为production
}

// development的打包速度快，但是体积大。由于开发时追求打包速度快，所以用dev
// production的打包体积小，但是速度慢。由于项目上线追求代码体积小，所以用pro。体积小是因为会把代码压缩处理