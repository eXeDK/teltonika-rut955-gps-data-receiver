'use strict'

import { DataBuffer } from '../data_buffer'
import { AVLDataArray } from '../avl_data_array'

const LENGTH_FOUR_ZEROS = 4
const LENGTH_CRC = 4
export enum TCPPacketType {
  Authentication = 'authentication',
  Data = 'data',
  Unknown = 'unknown'
}

/**
 * Made to the spec defined in the @link
 *
 * @link https://wiki.teltonika.lt/index.php?title=RUT955_Protocols
 */
export class TCPPacket {
  readonly type: TCPPacketType
  imei: string
  dataLength: number
  avlDataArray: AVLDataArray
  crc: Buffer

  constructor (rawData: Buffer) {
    this.type = this.getPacketType(rawData)

    // Authentication packet fields
    this.imei = null

    // Data packet fields
    this.dataLength = null
    this.avlDataArray = new AVLDataArray()
    this.crc = null

    // If this is an authentication packet, parse that
    if (this.type === TCPPacketType.Authentication) {
      this.readNewAuthenticationPacket(rawData)
    } else if (this.type === TCPPacketType.Data) {
      this.readNewDataPacket(rawData)
    }
  }

  /**
   * Determine the type of TCP packet
   *
   * @param rawData
   */
  private getPacketType (rawData: Buffer): TCPPacketType {
    if (rawData.length > 4 && rawData.slice(0, 4).equals(Buffer.alloc(4))) {
      return TCPPacketType.Data
    }

    if (rawData.length === 17) {
      return TCPPacketType.Authentication
    }

    return TCPPacketType.Unknown
  }

  /**
   * Get the IMEI of the device trying to authenticate
   *
   * @param rawData
   */
  private readNewAuthenticationPacket (rawData: Buffer): void {
    // Parse the device IMEI
    this.imei = rawData.slice(2, 17).toString()
  }

  /**
   * Parse the data packet
   *
   * @param rawData
   */
  private readNewDataPacket (rawData: Buffer): void {
    // Create data buffer and skip the first 4 bytes which is just zeros
    const dataBuffer = new DataBuffer(rawData.slice(LENGTH_FOUR_ZEROS))

    // Parse the length of the packet
    this.dataLength = dataBuffer.readUInt32()

    // Parse the AVL data array
    this.avlDataArray = AVLDataArray.readNew(dataBuffer)

    // Finally parse the CRC
    this.crc = dataBuffer.readBytes(LENGTH_CRC)
  }
}
