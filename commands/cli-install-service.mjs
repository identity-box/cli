#!/usr/bin/env node

import { Command } from 'commander'

import { runCommands } from '../lib/commands.mjs'

const program = new Command()

const getCommands = serviceName => {
  return [
    { cmd: `rm -rf ${serviceName}` },
    { cmd: `mkdir ${serviceName}` },
    { cmd: `(cd ${serviceName} && yarn set version berry)` },
    { cmd: `(cd ${serviceName} && echo "nodeLinker: node-modules" >> .yarnrc.yml)` },
    { cmd: `(cd ${serviceName} && yarn init)` },
    { cmd: `(cd ${serviceName} && yarn add @identity-box/${serviceName})` }
  ]
}

const installService = async serviceName => {
  runCommands(program, getCommands(serviceName))
  process.exit(0)
}

program.name('install-service')
  .argument('<serviceName>', 'name of the service to install')
  .option('-s, --silent', 'do not print the standard output of the executed commands', false)
  .action((serviceName) => {
    installService(serviceName)
  })

program.parse()
