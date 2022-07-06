const {generateAuthTokens} = require("../services/token.service");
const {passwordService} = require("../services");
const {Oauth} = require("../dataBase");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id} = req.user
            const {password} = req.body
            await passwordService.comparePasswords(hashPassword, password)

            const tokens = generateAuthTokens()

            await Oauth.create({
                userId: _id,
                ...tokens
            })
            res.json({
                user: req.user,
                ...tokens
            });
        } catch (e) {
            next(e)
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {refresh_token, userId} = req.tokenInfo
            await Oauth.deleteOne({refresh_token})

            const tokens = generateAuthTokens()
            await Oauth.create({userId, ...tokens})

            res.json(tokens)
        } catch (e) {
            next(e)
        }
    },

    logout: async (req, res, next) => {
        try {
            const {access_token} = req
            await Oauth.deleteOne({access_token})
            res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    },

    logoutAllDevices: async (req, res, next) => {
        try {
            const {_id}=req.user
            await Oauth.deleteMany({userId:_id})
            res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    },

}