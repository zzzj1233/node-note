const http = require('http')
const {URL} = require('url')
const qs = require('querystring')

const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://0.0.0.0:8080")

    let query = {}
    if (req.method === 'POST') {
        req.on("data", chunk => {
            console.log("body = ", chunk.toString())
        })
    } else {
        query = qs.parse(req.url)
    }

    res.statusCode = 200
    res.setHeader("content-type", "application/json;charset=utf-8")
    res.end(JSON.stringify({
        code: 200,
        msg: "ok",
        data: {
            query,
            url
        }
    }), "utf-8")
})

server.listen(8080, "0.0.0.0", () => {
    console.log('server started at 8080')
})
