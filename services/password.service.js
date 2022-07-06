const bcrypt = require('bcrypt')

const {CustomError} = require("../errors");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePasswords: async (hashPassword, password) => {
        const isPasswordSame = await bcrypt.compare(password, hashPassword)
        if(!isPasswordSame){
            return next(new CustomError('Wrong email or password'))
        }
    }
}