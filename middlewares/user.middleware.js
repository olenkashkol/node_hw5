const {CustomError}=require('../errors/CustomError')

module.exports = {
    isUserPresent: () => {

    },
    isUserValidForCreate: (req,res,next) => {
    try{
        const {name,age,email,password}=req.body
        if(!name||name.length<2){
            return next(new CustomError('Set valid name'))
        }
        if(!age||!Number.isInteger(age)||age<18){
            return next(new CustomError('Set valid age'))
        }
        if(!email||!email.includes('@')){
            return next(new CustomError('Set valid email'))
        }
        if(!password||name.password<8){
            return next(new CustomError('Set valid password'))
        }
        next()
    } catch (e) {
        next(e)
    }


    }
}