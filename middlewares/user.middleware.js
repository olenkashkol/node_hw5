const {CustomError} = require('../errors')
const {userValidator} = require("../validators");
const {userService} = require("../services");

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params
            const user=await userService.findOneUser({_id:id})
            if(!user){
                return next(new CustomError('User not found'))
            }
            req.user=user
            next()
        } catch (e) {
            next(e)
        }
    },

    isUserValidForCreate: async (req, res, next) => {
        try {
            const {error, value} = userValidator.newUserValidator.validate(req.body)

            if (error) {
                return next(new CustomError(error.details[0].message))
            }
            req.body = value
            next()
        } catch (e) {
            next(e)
        }
    },

    isUserValidForUpdate: async (req, res, next) => {
        try {
            const {error, value} = userValidator.updateValidator.validate(req.body)

            if (error) {
                return next(new CustomError(error.details[0].message))
            }
            req.body = value
            next()
        } catch (e) {
            next(e)
        }
    },

}