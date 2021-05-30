const express = require('express')

const app = express()

app.get("/register", (req, res, next) => {
    const {username} = req.query

    if (!username) {
        next(new Error("please offer username!"))
    }

    if (username === 'zzzj') {
        next(new Error("zzzj is already exists!"))
    }

    res.json({
        msg: "ok"
    })
    next()
})

app.use((err, req, res, next) => {
    res.json({
        code: err.code || 500,
        msg: err.message || "server error",
        success: false
    })
})


app.listen(8082)
