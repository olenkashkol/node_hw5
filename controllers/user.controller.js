const {userService} = require("../services");

module.exports = {
    findUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers()
            res.json(users)
        } catch (e) {
            next(e)
        }
    },
    createUser: async (req, res, next) => {
        try {
            const newUser = await userService.createUser(req.body)
            res.status(201).json(newUser)
        } catch (e) {
            next(e)
        }
    }
}