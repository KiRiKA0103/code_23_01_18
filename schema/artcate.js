const Joi = require('joi')

const name = Joi.string().min(1).max(16).required()
const alias = Joi.string().alphanum().required()

const id = Joi.number().integer().min(1).required()

exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}


exports.isid_cate_schema = {
    params: {
        id,
    }
}

exports.update_cate_schema = {
    body: {
        id,
        name,
        alias,
    },
}







