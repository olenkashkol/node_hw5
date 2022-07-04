const Joi=require('joi')
const {constants} = require("../configs");

module.exports = {
    nameValidator:Joi.string().min(2).max(50),
    ageValidator:Joi.number().integer().min(18).max(120),
    emailValidator:Joi.string().regex(constants.EMAIL_REGEX).lowercase().trim(),
    passwordValidator:Joi.string().regex(constants.PASSWORD_REGEX).trim()
}