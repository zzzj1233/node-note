const fs = require('fs')
const path = require('path')

const express = require('express')
const morgan = require('morgan')

const app = express()


// morgan是express官方的一个中间件,主要用于记录访问日志
const writeStream = fs.createWriteStream(path.resolve('access.log'), {
    encoding: "utf-8",
    flags: "a"
})

// https://github.com/expressjs/morgan
app.use(morgan(':method :url :status :response-time ms', {
    stream: writeStream
}))

// 1. 全局中间件
app.use((req, res, next) => {
    req.$$requestTime = Date.now()
    console.log(`${req.path} start`)
    next()
    console.log(`${req.path} end , spend : ${Date.now() - req.$$requestTime}ms `)
})

// 2. 全局路径中间件
app.use("/user", (req, res, next) => {
    console.log('matched user*')
    next()
})

const users = [
    {"name": "zzzj", "age": 23},
    {"name": "cjj", "age": 22}
]

// 3. 指定路径请求方法中间件
app.get("/user", (req, res, next) => {
    res.json(users)
    next()
})

app.get("/user/:name", (req, res, next) => {
    const {name: queryName} = req.params
    const user = users.find(({name}) => name === queryName)
    if (user) {
        res.json(user)
    } else {
        res.status(401).json({
            msg: `${queryName} not found !`
        })
    }
    next()
})

app.listen(8080, () => {
    console.log('express app started at 8080')
})
