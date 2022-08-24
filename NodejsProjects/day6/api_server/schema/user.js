const joi = require('joi');

// 用joi包的方法来定义用户名和密码的规则
const username = joi.string().alphanum().min(3).max(12).required();   //规则名要和表单名相同
const password = joi.string().pattern(/^[\S]{6,12}$/).required();
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
const avatar = joi.string().dataUri().required();

// 向外暴露验证规则对象    ,body里的属性名要和post的属性名相同
module.exports.reguserSchema = {
    body: {   //body（即请求体）表示是表单数据的规则
        username,       //等价于username: username
        password
    },
    query: {
        // query表示是 查询字符串的规则
    }

}

module.exports.updateSchema = {
    body: {
        id,
        email,
        nickname,
    }
}

module.exports.updatePasswordSchema = {
    body: {
        // 使用 password 这个规则，验证 req.body.oldPwd 的值
        oldPwd: password,
        // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
        // 解读：
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    }
}

module.exports.avatarSchema = {
    body: {
        avatar
    }
}