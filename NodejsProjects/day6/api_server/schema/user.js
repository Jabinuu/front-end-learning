const joi = require('joi');

// 用joi包的方法来定义用户名和密码的规则
const username = joi.string().alphanum().min(3).max(12).required();   //规则名要和表单名相同
const password = joi.string().pattern(/^[\S]{6,12}$/).required();

// 向外暴露验证规则对象    ,body里的username要和规则名、post的属性名完全相同
module.exports.reguser_Schema = {
    body: {   //body（即请求体）表示是表单数据的规则
        username,
        password
    },
    query: {
        // query表示是 查询字符串的规则
    }

}