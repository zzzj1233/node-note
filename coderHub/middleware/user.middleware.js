class UserMiddleware {
    async paramsCheck(ctx, next) {
        const {phone, password} = ctx.request.body
        if (!phone || !phone.trim()) {
            ctx.throw(500, "phone could not be empty!")
        }
        if (!password || !password.trim()) {
            ctx.throw(500, "password could not be empty!")
        }
        await next()
    }
}

module.exports = new UserMiddleware()
