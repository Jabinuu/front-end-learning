import $ from 'jquery'    // es6高级语法，目前没有引擎能解析import，所以都要通过webpack进行兼容性处理


$(function () {
    $('li:odd').css('background-color', 'red')
    $('li:even').css('background-color', 'skyblue')

})
// npm install命令安装包时，是把包安装在与package.json同目录下的node_modules文件夹里的
// 所以说，先npm init -y 在相应的目录下生成package.json，再安装包


// 打包的含义：1. 改写具有兼容性问题的代码
//            2. 将入口文件里引入的模块和入口文件一同打包，放在同一个文件里并压缩