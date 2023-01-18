const Joi = require('joi')

// string() 值必须是字符串
// alphanum() 值只能是包含a-zA-Z0-9的字符串
// min(length) 最小长度
// max(length) 最大长度
// required() 值不能为空
// pattern(正则表达式)

const id = Joi.number().integer().min(1).required()

const email = Joi.string().pattern(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).required()

// 至少8-16个字符，至少1个大写字母，1个小写字母和1个数字
const password = Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/).required()

const nickname = Joi.string()

const avatar = Joi.string().dataUri().required()

exports.reg_login_schema = {
    body: {
        email,
        password
    }
}


exports.update_userinfo_schema = {
    body: {
        id,
        email,
        nickname,
    }
}

exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: Joi.not(Joi.ref('oldPwd')).concat(password),
    }
}


exports.update_avatar_schame = {
    body: {
        avatar,
    }
}