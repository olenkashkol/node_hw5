const router = require('express').Router()

const {userController} = require("../controllers");
const {userMiddleware, commonMiddleware, authMiddleware} = require("../middlewares");

router.get('/',
    userMiddleware.isUserQueryValid,
    userController.findUsers)

router.post('/',
    userMiddleware.isUserValidForCreate,
    userMiddleware.isUserUnique,
    userController.createUser)

router.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getUserById)

router.put('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserValidForUpdate,
    userMiddleware.isUserPresent,
    userController.updateUserById)

router.delete('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserPresent,
    userController.deleteUserById)

module.exports = router