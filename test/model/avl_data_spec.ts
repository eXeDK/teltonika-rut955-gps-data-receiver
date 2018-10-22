'use strict'

import * as chai from 'chai'
import { DataBuffer } from '../../src/model/data_buffer'
import { AVLData } from '../../src/model/avl_data'
import { GPSElement } from '../../src/model/gps_element'
import { IOElement } from '../../src/model/io_element'

const expect = chai.expect

describe('AVLData', () => {
  describe('readNew', () => {
    const testDataBuffer = new DataBuffer(Buffer.from('0000016575891210000613186a21768555001b00070800000001011503000000', 'hex'))
    const parsedAvlData = AVLData.readNew(testDataBuffer)

    it('should parse the timestamp correctly and return that as a Date object', () => {
      return expect(parsedAvlData.timestamp).to.be.eql(new Date(1535275242000))
    })

    it('should parse the priority correctly', () => {
      return expect(parsedAvlData.priority).to.be.eql(0)
    })

    it('should parse the GPS element correctly and return it into gpsElement', () => {
      return expect(parsedAvlData.gpsElement).to.be.instanceof(GPSElement)
    })

    it('should parse the IO element correctly and return it into ioElement', () => {
      return expect(parsedAvlData.ioElement).to.be.instanceof(IOElement)
    })
  })
})
