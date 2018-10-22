'use strict'

import { DataBuffer } from './data_buffer'
import decimal from 'decimal.js'

const GPS_PRECISION = 10000000

export class GPSElement {
  longitude: number
  latitude: number
  altitude: number
  angle: number
  satellites: number
  speed: number

  constructor () {
    this.longitude = 0.0
    this.latitude = 0.0
    this.altitude = 0.0
    this.angle = 0.0
    this.satellites = 0
    this.speed = 0.0
  }

  public static readNew (buffer: DataBuffer): GPSElement {
    const gpsElement = new GPSElement()

    // Parsing GPS longitude (4 bytes signed)
    gpsElement.longitude = new decimal.Decimal(buffer.readInt32()).dividedBy(GPS_PRECISION).toNumber()

    // Parsing GPS latitude (4 bytes signed)
    gpsElement.latitude = new decimal.Decimal(buffer.readInt32()).dividedBy(GPS_PRECISION).toNumber()

    // Parsing GPS altitude (2 bytes unsigned)
    gpsElement.altitude = buffer.readUInt16()

    // Parsing GPS angle (2 bytes unsigned)
    gpsElement.angle = buffer.readUInt16()

    // Parsing GPS satellites (1 byte)
    gpsElement.satellites = buffer.readUInt8()

    // Parsing GPS speed (2 bytes unsigned)
    gpsElement.speed = buffer.readUInt16()

    return gpsElement
  }
}
