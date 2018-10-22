'use strict'

import { TCPPacket } from '../../model/tpc/tcp_packet'

export class TCPEncoder {
  public static encodeAuthentication (authenticated: boolean): Buffer {
    if (authenticated) {
      return Buffer.from([0x01])
    }

    return Buffer.from([0x00])
  }

  public static encodeDataPacketLength (tcpPacket: TCPPacket): Buffer {
    return Buffer.from(tcpPacket.avlDataArray.avlDataLength.toString(16), 'hex')
  }
}
