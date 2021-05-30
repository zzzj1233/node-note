const Router = require('@koa/router')

const userRouter = new Router({
    prefix: "/user"
})

const {
    paramsCheck: userParamCheck
} = require('../middleware/user.middleware')

const {
    register,
    login,
    profile
} = require('../controller/user.controller')

userRouter.post("/register", userParamCheck, register)
userRouter.post("/login", userParamCheck, login)
userRouter.get("/profile", profile)

module.exports = userRouter
