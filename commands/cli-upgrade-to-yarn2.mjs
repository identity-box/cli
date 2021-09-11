#!/usr/bin/env node

import { Command } from 'commander'
import shell from 'shelljs'
import chalk from 'chalk'

const program = new Command()

const log = console.log
const info = chalk.cyan
const error = chalk.red
const warning = chalk.yellow
const confirm = chalk.green

const commands = [
  { cmd: 'yarn set version berry' },
  { cmd: 'echo "nodeLinker: node-modules" >> .yarnrc.yml' },
  { cmd: 'yarn install', fallback: [
    { cmd: 'rm yarn.lock'},
    { cmd: 'yarn install'}
  ]}
]

const runCommands = commands => {
  commands.forEach(({ cmd, fallback }) => {
    log(info('[i] Running ') + info.bold(`${cmd}`))
    if (shell.exec(cmd, { silent: program.opts().silent }).code !== 0) {
      log(error('[e] Error executing: ' + error.inverse(` ${cmd} `)))
      if (fallback) {
        log(warning('[!] executing fallback commands for ' + warning.inverse(` ${cmd} `)))
        runCommands(fallback)
        log(warning('[✓] finished running fallback commands'))
      }
      process.exit(1)  
    } else {
      log(confirm('[✓] done running ' + confirm.bold(`${cmd}`)))
    }
  })
}

const upgradeToYarn2 = async () => {
  runCommands(commands)
  process.exit(0)
}

program.name('upgrade-to-yarn2')
  .option('-s, --silent', 'do not print the standard output of the executed commands', false)
  .action(() => {
    upgradeToYarn2()
  })

program.parse()
