import $ from 'jquery'    // es6高级语法，目前没有引擎能解析import，所以都要通过webpack进行兼容性处理
import '@/css/index.css'    // 如果某个模块中，用from接受到的变量为undefined ，则没必要接收，仅导入即可
import logo from '../images/msgcenter_close.png'     // 把图片读取为base64字符串，
$('.box').attr('src', logo);    // 给img的src属性赋值base64字符串，这样仅需读html文件即可同时得到图片，而不需要根据图片的url再次访问服务器
$(function () {
    $('li:odd').css('background-color', 'red')
    $('li:even').css('background-color', 'skyblue')

})
consle.log('ss');
// npm install命令安装包时，是把包安装在与package.json同目录下的node_modules文件夹里的
// 所以说，先npm init -y 在相应的目录下生成package.json，再安装包


// 打包的含义：1. 改写具有兼容性问题的代码
//            2. 将入口文件里引入 