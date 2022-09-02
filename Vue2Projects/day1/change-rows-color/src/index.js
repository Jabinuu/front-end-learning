import $ from 'jquery'    // es6高级语法，目前没有引擎能解析import，所以都要通过webpack进行兼容性处理

// 2. 定义 jQuery 的入口函数
$(function () {
    // 3. 实现奇偶行变色
    // 奇数行为红色
    $('li:odd').css('background-color', 'red')
    $('li:even').css('background-color', 'green')
    // 0 是偶数
    // 1 是奇数
})


// npm install命令安装包时，是把包安装在与package.json同目录下的node_modules文件夹里的
// 所以说，先npm init -y 在相应的目录下生成package.json，再安装包