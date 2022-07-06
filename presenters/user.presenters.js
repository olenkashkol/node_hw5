module.exports = {
    userPresenter: (user) => {
        return {
            name: user.name,
            email: user.email,
            age: user.age,
            _id: user._id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }
}