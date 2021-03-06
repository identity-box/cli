#!/usr/bin/env node

import commander from 'commander'

// https://stackoverflow.com/questions/60205891/import-json-extension-in-es6-node-js-throws-an-error
import { createRequire } from "module"
const require = createRequire(import.meta.url);

const packageJSON = require('../package.json')

const program = new commander.Command()

const main = async () => {
  program
    .version(`${packageJSON.version}`)
    .usage('command [options]')
    .on('command:*', () => {
      console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '))
      process.exit(1)
    })
  program.command('info', 'query the package description via IPC call')
  program.command('upgrade-to-yarn2', 'updates the existing service to use yarn 2 in the node_modules linking mode')
  program.command('install-service', 'installs an Identity Box service')

  program.parse()
}

main()
