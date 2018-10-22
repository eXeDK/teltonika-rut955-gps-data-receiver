'use strict'
import * as net from 'net'
import { TCPPacket, TCPPacketType } from '../../src/model/tpc/tcp_packet'
import { TCPEncoder } from '../../src/encoder/tcp/tcp_encoder'

const server = net.createServer()

server.on('connection', socket => {
  console.info('Connection from: ' + socket.remoteAddress)
  let socketImei = ''

  socket.on('data', data => {
    const tcpPacket = new TCPPacket(data)

    // If this is an authentication packet we need to verify that and move on
    if (tcpPacket.type === TCPPacketType.Authentication) {
      console.info('Authentication happened', tcpPacket)
      // Check that the IMEI is correct and proceed
      // If not then close the socket with socket.end()

      // Save IMEI for the next packets on the socket which don't contain the IMEI
      socketImei = tcpPacket.imei
      // Answer the client
      socket.write(TCPEncoder.encodeAuthentication(true))
      return
    } else {
      console.info('A packet just came in', tcpPacket)

      // Answer the client
      socket.write(TCPEncoder.encodeDataPacketLength(tcpPacket), 'hex')
    }
  })
})

server.listen(17050, '0.0.0.0', () => {
  console.info('Now listening on port 17050')
})
