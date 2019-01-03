'use strict'
import * as net from 'net'
import * as log from 'loglevel'
import { TCPEncoder } from '../encoder/tcp/tcp_encoder'
import { TCPPacket, TCPPacketType } from '../model/tpc/tcp_packet'
import { EventEmitter } from 'events'

export interface TCPServerOptions {
  allowedImeis: Array<string>,
  logLevel: log.LogLevelDesc
}

export class TCPServer extends EventEmitter {
  private allowedImeis: Set<string>
  private server: net.Server

  constructor (options?: TCPServerOptions) {
    super()

    this.allowedImeis = new Set<string>()

    // Set default log level
    log.setDefaultLevel('info')

    if (options.allowedImeis !== null) {
      this.allowedImeis = new Set<string>(options.allowedImeis)
    }

    if (options.logLevel !== null) {
      log.setLevel(options.logLevel)
    }
  }

  public static createServer (options?: TCPServerOptions): TCPServer {
    return new TCPServer(options)
  }

  public listen (port: number, hostname: string = '0.0.0.0', listeningCb?: (...args: any[]) => void): void {
    this.server = net.createServer()

    this.server.on('connection', this.handleConnection.bind(this))

    this.server.listen(port, hostname, listeningCb)
  }

  private handleConnection (socket: net.Socket): void {
    log.info('Connection from: "' + socket.remoteAddress + '"')
    let socketImei = null

    socket.on('data', data => {
      const tcpPacket = new TCPPacket(data)

      // If this is an authentication packet we need to verify that and move on
      if (tcpPacket.type === TCPPacketType.Authentication) {
        socketImei = tcpPacket.imei

        // Check if device is authenticated, if not: close the socket
        if (this.allowedImeis.size > 0 && !this.allowedImeis.has(socketImei)) {
          log.debug('Client from "' + socket.remoteAddress + '" is not authenticated, socket was closed')
          this.emit('failedAuthentication', tcpPacket)
          socket.end()
          return
        }

        // Emit event
        this.emit('authentication', tcpPacket)

        // Answer the client
        socket.write(TCPEncoder.encodeAuthentication(true))
        return
      } else if (tcpPacket.type === TCPPacketType.Data) {
        // Client has not yet authenticated, close the socket
        if (socketImei === null) {
          log.debug('Client from "' + socket.remoteAddress + '" did not authenticate, socket was closed')
          this.emit('failedAuthentication', tcpPacket)
          socket.end()
          return
        }

        // Set the IMEI on the packet for handling downstream
        tcpPacket.imei = socketImei

        // Emit event
        this.emit('packet', tcpPacket)

        socket.write(TCPEncoder.encodeDataPacketLength(tcpPacket), 'hex')
      } else {
        log.debug('Got malformed packet from "' + socket.remoteAddress + '", socket was closed')
        log.debug('Data from "' + socket.remoteAddress + '" as HEX: ' + data.toString('hex'))
        socket.end()
        return
      }
    })
    socket.on('error', error => {
      log.info('Got an error with the connection to "' + socket.remoteAddress + '", socket was closed')
      log.info('Error was: ' + JSON.stringify(error))
    })
  }
}
