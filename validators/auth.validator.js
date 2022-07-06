const Joi=require('joi')
const {passwordValidator, emailValidator} = require("./common.validator");

module.exports = {
    login:Joi.object({
        password:passwordValidator.required(),
        email:emailValidator.required(),
    })
}