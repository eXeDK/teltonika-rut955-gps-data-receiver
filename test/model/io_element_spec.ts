'use strict'

import * as chai from 'chai'
import { DataBuffer } from '../../src/model/data_buffer'
import { IO, IOElement } from '../../src/model/io_element'

const expect = chai.expect

describe('IOElement', () => {
  describe('readNew', () => {
    const testDataBuffer = new DataBuffer(Buffer.from('0001011503000000', 'hex'))
    const parsedIoElement = IOElement.readNew(testDataBuffer)

    it('should parse the first byte as the event IO ID', () => {
      return expect(parsedIoElement.eventIoId).to.be.equals(0)
    })

    it('should parse the second byte as the event IO ID', () => {
      return expect(parsedIoElement.ioLength).to.be.equals(1)
    })

    it('should return an IOArray with the sizes of the elements which is 1, 2, 4 and 8 bytes', () => {
      return expect(Object.keys(parsedIoElement.ioArray)).to.be.eql(['1', '2', '4', '8'])
    })

    it('should parse an element of size 1 correctly and parse the getLength of the IO correctly', () => {
      return expect(parsedIoElement.ioArray[1]).to.be.instanceof(IO)
    })

    it('should parse an element of size 1 correctly and parse the getLength of the IO correctly', () => {
      return expect(parsedIoElement.ioArray[1].ioLength).to.be.eql(1)
    })

    it('should parse an element of size 1 correctly and parse return an array of events and parse the IO ID correctly', () => {
      return expect(Object.keys(parsedIoElement.ioArray[1].events)[0]).to.be.eql('21')
    })

    it('should parse an element of size 1 correctly and parse return an array of events where the values are IO ID => Buffer', () => {
      return expect(parsedIoElement.ioArray[1].events['21']).to.be.eql(Buffer.from('03', 'hex'))
    })
  })
})
