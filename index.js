#!node
const {program} = require('commander')
const command = require('./command')

program.version(require('./package.json').version)

command(program)

program.parse(process.argv)
