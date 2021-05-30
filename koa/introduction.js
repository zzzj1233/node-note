const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const userRouter = new Router({prefix: "/user"})

// 1. 使用koa-bodyparser就可以像express一样通过ctx.request.body获取请求体参数,或者表单参数
// url-encoded参数需要通过koa-multer获取,express也需要通过multer获取
app.use(bodyParser())

// 2. 使用koa-router后,可以获取路径参数和url参数
// ctx.params , ctx.query
userRouter.all("/:id", (ctx, next) => {
    // koa的body可以直接赋值对象
    ctx.body = {
        params: ctx.params,
        query: ctx.query,
        body: ctx.request.body
    }
    next()
})

app.use(userRouter.routes())
    .use(userRouter.allowedMethods())

app.listen(3000)
