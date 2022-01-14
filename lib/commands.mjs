import shell from 'shelljs'
import chalk from 'chalk'

import { Command } from 'commander'

const program = new Command()

const log = console.log
const info = chalk.cyan
const error = chalk.red
const warning = chalk.yellow
const confirm = chalk.green

const runCommands = (program, commands) => {
  console.log('program.opts().silent=', program.opts().silent)
  commands.forEach(({ cmd, fallback }) => {
    log(info('[i] Running ') + info.bold(`${cmd}`))
    if (shell.exec(cmd, { silent: program.opts().silent }).code !== 0) {
      log(error('[e] Error executing: ' + error.inverse(` ${cmd} `)))
      if (fallback) {
        log(warning('[!] executing fallback commands for ' + warning.inverse(` ${cmd} `)))
        runCommands(program, fallback)
        log(warning('[✓] finished running fallback commands'))
      }
      process.exit(1)  
    } else {
      log(confirm('[✓] done running ' + confirm.bold(`${cmd}`)))
    }
  })
}

export { runCommands }
