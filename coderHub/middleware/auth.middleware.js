const jwt = require('jsonwebtoken')

const {
    PRIVATE_KEY, PUBLIC_KEY
} = require('../app/config')

const unAuth = require('../app/un_auth')

const algorithm = "RS256"

class AuthMiddleware {

    async auth(ctx, next) {

        const url = ctx.request.url

        if (unAuth.some(unAuthUrl => unAuthUrl === url)) {
            return await next()
        }

        try {
            const token = ctx.headers.authorization.replace("Bearer ", "")
            ctx.state.user = jwt.verify(token, PUBLIC_KEY, {
                algorithms: [algorithm]
            })
        } catch (e) {
            ctx.throw(401, "Authentication failed")
        }

        await next()
    }

    genToken(user) {
        return jwt.sign(user, PRIVATE_KEY, {
            expiresIn: "2h",
            algorithm
        },)
    }

}

module.exports = new AuthMiddleware()
