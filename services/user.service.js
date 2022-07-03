const {User} = require('../dataBase')

module.exports = {

    findUsers: (params = {}) => {
        return User.find(params)
    },
    createUser: (user) => {
        return User.create(user)
    }
}