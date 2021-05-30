const {
    selectUserByPhone,
    selectUserById,
    insertUser
} = require('../service/user.service')

const {
    genToken
} = require('../middleware/auth.middleware')

class UserController {
    async register(ctx, next) {
        const {phone, password} = ctx.request.body

        const existsUser = await selectUserByPhone(phone, password)

        if (existsUser) {
            ctx.throw(`phone : ${phone} exists`)
        }

        // 加密
        const salt = process.env.pwd_salt || "salt"

        const newPwd = ctx.utils.md5(password + salt)

        // 存入数据库
        await insertUser(phone, newPwd)

        await next()

        ctx.success()
    }

    async login(ctx, next) {
        const {phone, password} = ctx.request.body

        const existsUser = await selectUserByPhone(phone, password)

        if (!existsUser) {
            ctx.throw(`login failed : phone : ${phone} not exists`)
        }

        // 加密
        const salt = process.env.pwd_salt || "salt"

        const newPwd = ctx.utils.md5(password + salt)

        if (newPwd !== existsUser.password) {
            ctx.throw(`login failed : password is wrong`)
        }

        // 生成token
        const token = genToken({
            id: existsUser.id,
            phone: existsUser.mobilephone
        })

        ctx.body = {
            user: {...existsUser},
            token
        }

        await next()
    }

    // 获取用户信息
    async profile(ctx, next) {
        const {id} = ctx.state.user
        ctx.body = await selectUserById(id)
        await next()
    }

}

module.exports = new UserController()
