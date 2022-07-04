const userRouter = require('express').Router()

const {userController} = require("../controllers");
const {userMiddleware} = require("../middlewares");

userRouter.get('/', userController.findUsers)

userRouter.post('/', userMiddleware.isUserValidForCreate,userController.createUser)

router.get('/:id',)
router.put('/:id',)
router.delete('/:id',)

module.exports = userRouter