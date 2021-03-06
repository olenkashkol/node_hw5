const {userService} = require("../services");
const {CustomError} = require("../errors");
const {Oauth} = require("../dataBase");
const {checkToken} = require("../services/token.service");
const {authValidator} = require("../validators");

module.exports = {
    isLoginBodyValid: async (req, res, next) => {
        try {
            const {error, value} = authValidator.login.validate(req.body)

            if (error) {
                return next(new CustomError('Wrong email or password'))
            }
            req.body = value
            next()
        } catch (e) {
            next(e)
        }
    },

    isUserPresentForAuth: async (req, res, next) => {
        try {
            const {email} = req.body
            const user = await userService.findOneUser({email})

            if (!user) {
                return next(new CustomError('Wrong email or password'))
            }

            req.user = user
            next()
        } catch (e) {
            next(e)
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get('Authorization')
            if (!refresh_token) {
                return next(new CustomError('No token', 401))
            }

            checkToken(refresh_token, 'refresh')

            const tokenInfo = await Oauth.findOne({refresh_token})
            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401))
            }

            req.tokenInfo = tokenInfo
            next()
        } catch (e) {
            next(e)
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization')
            if (!access_token) {
                return next(new CustomError('No token', 401))
            }

            checkToken(access_token)

            const tokenInfo = await Oauth.findOne({access_token}).populate('userId')
            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401))
            }
            req.access_token = tokenInfo.access_token
            req.user = tokenInfo.userId
            next()
        } catch (e) {
            next(e)
        }
    },
}