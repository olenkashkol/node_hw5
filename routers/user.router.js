const userRouter = require('express').Router()

const {userController} = require("../controllers");
const {userMiddleware, commonMiddleware} = require("../middlewares");

userRouter.get('/', userController.findUsers)

userRouter.post('/', userMiddleware.isUserValidForCreate,userController.createUser)

userRouter.get('/:id',commonMiddleware.isIdValid,userMiddleware.isUserPresent,userController.getUserById)
userRouter.put('/:id',commonMiddleware.isIdValid,)
userRouter.delete('/:id',commonMiddleware.isIdValid,)

module.exports = userRouter