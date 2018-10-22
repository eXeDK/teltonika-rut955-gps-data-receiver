'use strict'

import * as net from 'net'

const socket = new net.Socket()

socket.on('connect', () => {
  console.log('Connected to server')
  console.log('Sending authentication packet')

  const imeiBuffer = Buffer.from('INSERT-AUTHENTICATION-DATA-HERE', 'hex')

  socket.write(imeiBuffer, 'binary')
})

socket.on('data', data => {
  if (data.toString('hex') === '01') {
    console.log('Sending data packet')

    const dataBuffer = Buffer.from('INSERT-DATA-PACKET-DATA-HERE', 'hex')

    socket.write(dataBuffer, 'binary')
  }
})

socket.connect(17050, '127.0.0.1')
