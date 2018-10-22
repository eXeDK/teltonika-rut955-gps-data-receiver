'use strict'

import { DataBuffer } from './data_buffer'

const LENGTH_IO_VALUE = 1

export class IOElement {
  eventIoId: number
  ioLength: number
  ioArray: { [key: number]: IO }

  constructor () {
    this.eventIoId = null
    this.ioLength = 0
    this.ioArray = {
      1: null,
      2: null,
      4: null,
      8: null
    }
  }

  public static readNew (buffer: DataBuffer): IOElement {
    const ioElement = new IOElement()
    // Parsing IO event ID
    ioElement.eventIoId = buffer.readUInt8()

    // Parsing the total number of IO
    ioElement.ioLength = buffer.readUInt8()

    // Parse all the real IO data
    Object.keys(ioElement.ioArray).forEach(ioSize => {
      let io = new IO()
      io.ioLength = buffer.readUInt8()

      for (let j = 0; j < io.ioLength; j++) {
        const ioId = buffer.readUInt8()

        io.events[ioId] = buffer.readBytes(LENGTH_IO_VALUE * parseInt(ioSize, 10))
      }

      ioElement.ioArray[ioSize] = io
    })

    return ioElement
  }
}

export class IO {
  ioLength: number
  events: { [key: number]: Buffer }

  constructor () {
    this.ioLength = 0
    this.events = {}
  }
}
