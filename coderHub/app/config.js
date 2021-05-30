const fs = require('fs')
const path = require('path')

const dotenv = require("dotenv")

// 读取.env文件并且赋值到process.env
dotenv.config()

const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, "../resource/public.key"), "utf-8")
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, "../resource/private.key"), "utf-8")

module.exports = {
    PUBLIC_KEY,
    PRIVATE_KEY
}
