#!/usr/bin/env node

import { Command } from 'commander'
import { ServiceProxy } from '@identity-box/utils'

const program = new Command()

const getAppInfo = async ({ servicePath, boxOffice }) => {
  let serviceProxy
  if (boxOffice) {
    serviceProxy = new ServiceProxy('identity-box.box-office')
  } else {
    serviceProxy = new ServiceProxy(servicePath)
  }

  const message = {
    method: 'about',
    servicePath
  }

  const { response } = await serviceProxy.send(message)

  const pretty = JSON.stringify(response, null, '  ')

  console.log(pretty)
  process.exit(0)
}

program.name('info')
  .argument('[servicePath]', 'service path to the service we want to ask for the current version in the format: service-namespace.service-id', 'identity-box.box-office')
  .option('-b, --boxOffice', 'send message to the box-office and let the box-office to dispatch the message to the appropriate service', false)
  .action((servicePath) => {
    const { boxOffice } = program.opts()
    console.log('boxOffice=', boxOffice)
    getAppInfo({ servicePath, boxOffice })
  })

program.parse()