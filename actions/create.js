const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const {exec} = require('child_process')
/**
 *
 * @param  {string} projectName
 */
module.exports = async function (projectName) {
    const projectPath = path.isAbsolute(projectName) ? projectName : path.resolve(projectName)

    if (fs.existsSync(projectPath)) {
        return console.log(chalk.red.bold(`${projectPath} exists`))
    }

    await fs.promises.mkdir(projectPath)

    // 进入目录执行npm init -y
    exec("npm.cmd init -y", {
        cwd: projectPath
    }, function () {

    })

    const srcPath = path.join(projectPath, "src")

    // 创建src
    fs.mkdirSync(srcPath)

    // 创建main.js
    fs.writeFile(path.join(srcPath, "main.js"), Buffer.alloc(0), function () {

    })
    // 创建App.vue
    fs.writeFile(path.join(srcPath, "App.vue"), Buffer.alloc(0), function (err) {
        
    })
}
