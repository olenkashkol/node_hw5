const {CustomError}=require('../errors')
const {userValidator} = require("../validators");

module.exports = {
    isUserPresent: () => {

    },

    isUserValidForCreate: async (req,res,next) => {
    try{
       const {error,value}=userValidator.newUserValidator.validate(req.body)

        if(error){
            return next (new CustomError(error.details[0].message))
        }
        req.body=value
        next()
    } catch (e) {
        next(e)
    }
    },

    isUserValidForUpdate: async (req,res,next) => {
        try{
            const {error,value}=userValidator.updateValidator.validate(req.body)

            if(error){
                return next (new CustomError(error.details[0].message))
            }
            req.body=value
            next()
        } catch (e) {
            next(e)
        }
    },

}