#!/usr/bin/env node

import { Command } from 'commander'

import { runCommands } from '../lib/commands.mjs'

const program = new Command()

const commands = [
  { cmd: 'yarn set version berry' },
  { cmd: 'echo "nodeLinker: node-modules" >> .yarnrc.yml' },
  { cmd: 'yarn install', fallback: [
    { cmd: 'rm yarn.lock'},
    { cmd: 'yarn install'}
  ]}
]

const upgradeToYarn2 = async () => {
  runCommands(program, commands)
  process.exit(0)
}

program.name('upgrade-to-yarn2')
  .option('-s, --silent', 'do not print the standard output of the executed commands', false)
  .action(() => {
    upgradeToYarn2()
  })

program.parse()
