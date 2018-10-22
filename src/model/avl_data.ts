'use strict'

import { GPSElement } from './gps_element'
import { IOElement } from './io_element'
import { DataBuffer } from './data_buffer'

export class AVLData {
  timestamp: Date
  priority: number
  gpsElement: GPSElement
  ioElement: IOElement

  constructor () {
    this.timestamp = null
    this.priority = 0
    this.gpsElement = null
    this.ioElement = null
  }

  public static readNew (buffer: DataBuffer): AVLData {
    const avlData = new AVLData()

    // Parse timestamp
    avlData.timestamp = new Date(buffer.readUInt64())

    // Parse priority
    avlData.priority = buffer.readUInt8()

    // Parse GPS Element
    avlData.gpsElement = GPSElement.readNew(buffer)

    // Parse IO Element
    avlData.ioElement = IOElement.readNew(buffer)

    return avlData
  }
}
