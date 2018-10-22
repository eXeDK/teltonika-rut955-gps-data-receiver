'use strict'

import { TCPServer, TCPServerOptions } from '../../src/server/server'

const myServer = TCPServer.createServer({
  allowedImeis: ['250124036312427'],
  logLevel: 'trace'
} as TCPServerOptions)

myServer.listen(17050, '0.0.0.0', () => {
  console.log('Now listening on port 17050')
})

myServer.on('authentication', packet => {
  console.log('Authentication happened', packet)
})

myServer.on('packet', packet => {
  console.log('A packet just came in', packet)
})
