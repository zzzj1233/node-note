const fs = require('fs')

module.exports = use = async function (ctx) {
    const files = await fs.promises.readdir(__dirname)
    files.forEach(file => {
        if (file.endsWith(".router.js")) {
            const router = require('./' + file)
            ctx.use(router.routes())
            ctx.use(router.allowedMethods())
        }
    })
}
