const express = require('express')

const newsRouter = require('./routes/news')

const app = express()

app.use(express.json())

app.use("/news", newsRouter)

app.listen(8080)
