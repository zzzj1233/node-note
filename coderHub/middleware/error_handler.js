/**
 *
 * @param err {Error}
 */
module.exports = function (err, ctx) {

    if (err) {
        console.error(err)
    }

    const msg = err.message || "server error"
    const code = err.statusCode || 500
    ctx.body = {
        msg,
        code,
        success: false
    }
}

