/**
 * @param {Command} program
 */
const commander = {}

commander.create = function (program) {
    program
        .command("create <projectName>")
        .description("quickly create a vue project")
        .action(require('../actions/create'))
}

/**
 * @param {Command} program
 */
module.exports = function (program) {
    Object.keys(commander)
        .forEach(key => {
            if (typeof commander[key] === 'function') {
                commander[key](program)
            }
        })
}

