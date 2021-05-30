const _ = require('./app/config')
const pool = require('./app/dbPool')
const {auth} = require('./middleware/auth.middleware')

const utils = require('utility')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

const errorHandler = require('./middleware/error_handler')

Object.defineProperty(app.context, 'utils', {
    get() {
        return utils
    }
})

app.context.success = function (msg = "success", code = 200) {
    this.body = {
        msg,
        code,
        success: true
    }
}

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    }
})

app.use(auth)

app.on('error', errorHandler)

app.use(bodyParser())

// 路由注册
require('./router')(app)

// 端口监听
const server = app.listen(process.env.port, () => {
    console.log(`server started at ${process.env.port}`)
})

// 监听linux信号
function shutDown() {
    server.close(async () => {
        await pool.end()
        console.log('server closed')
    })
}

process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)

