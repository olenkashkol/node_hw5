const jwt = require('jsonwebtoken')

const {ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET} = require("../configs/configs");
const {CustomError} = require("../errors");

function generateAuthTokens(payload = {}) {
    const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
    return {
        access_token,
        refresh_token
    }
}

function checkToken(token = '', typeToken = 'access') {
    try {
        let secret

        if (typeToken === 'access') secret = ACCESS_TOKEN_SECRET;
        if (typeToken === 'refresh') secret = REFRESH_TOKEN_SECRET;

        return jwt.verify(token, secret)
    } catch (e) {
        return  new CustomError('Token not valid', 401)
    }
}


module.exports = {
    generateAuthTokens,
    checkToken
}