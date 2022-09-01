import $ from 'jquery'    // es6高级语法，目前没有引擎能解析import，所以都要通过webpack进行兼容性处理

// 2. 定义 jQuery 的入口函数
$(function () {
    // 3. 实现奇偶行变色
    // 奇数行为红色
    $('li:odd').css('background-color', 'red')
    $('li:even').css('background-color', 'pink')
    // 0 是偶数
    // 1 是奇数
})