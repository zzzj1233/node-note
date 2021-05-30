const express = require('express')

const router = express.Router()

/***
 *
 * @type {Array<News>}
 */
const news = [
    {title: "西圣Ava蓝牙耳机亲身体验", subContent: "西圣Ava蓝牙耳机亲身体验...", pubTime: Date.now()},
    {title: "Visual Studio 是不是坑了一代人？为什么？", subContent: "认识的几个win32程序员喜欢它就像我喜欢eclipse一样. 但是我确实不喜欢这个玩意...", pubTime: Date.now()}
]

router.get("/", (req, res, next) => {
    res.json(news)
    next()
})

router.post("/", (req, res, next) => {
    const {title, subContent} = req.body
    news.push({
        title,
        subContent,
        pubTime: Date.now()
    })
    res.json({
        msg: "ok"
    })
})

module.exports = router
