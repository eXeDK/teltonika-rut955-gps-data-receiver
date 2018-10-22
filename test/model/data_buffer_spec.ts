'use strict'

import * as chai from 'chai'
import { DataBuffer } from '../../src/model/data_buffer'

const expect = chai.expect

describe('DataBuffer', () => {
  const testRawBuffer = Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11, 0x12])
  let testDataBuffer: DataBuffer

  beforeEach(() => {
    testDataBuffer = new DataBuffer(testRawBuffer)
  })

  describe('constructor', () => {
    it('should set the internal buffer to the one supplied in the constructor', () => {
      return expect(testDataBuffer.getBuffer()).to.be.eql(testRawBuffer)
    })
  })

  describe('getLength', () => {
    it('should get the getLength from the internal buffer correctly', () => {
      return expect(testDataBuffer.getLength()).to.be.eql(testRawBuffer.length)
    })
  })

  describe('getPosition', () => {
    it('should get the position of the DataBuffer before moving', () => {
      return expect(testDataBuffer.getPosition()).to.be.eql(0)
    })
  })

  describe('readBytes', () => {
    it('should read x bytes from the current position and forward', () => {
      testDataBuffer.readBytes(1)
      return expect(testDataBuffer.readBytes(4)).to.be.eql(Buffer.from([0x02, 0x03, 0x04, 0x05]))
    })

    it('should get the position of the DataBuffer after reading x bytes', () => {
      testDataBuffer.readBytes(6)
      return expect(testDataBuffer.getPosition()).to.be.eql(6)
    })
  })

  describe('readUInt64', () => {
    it('should read the unsigned 64-bit int correctly from the buffer', () => {
      testDataBuffer = new DataBuffer(Buffer.from('0000016575891210', 'hex'))
      return expect(testDataBuffer.readUInt64()).to.be.eql(1535275242000)
    })

    it('should read the large unsigned 64-bit int correctly from the buffer', () => {
      testDataBuffer = new DataBuffer(Buffer.from('80000000000003e7', 'hex'))
      return expect(testDataBuffer.readUInt64()).to.be.eql(9223372036854776807)
    })

    it('should move the position of the DataBuffer 8 bytes after using readUInt64', () => {
      testDataBuffer.readUInt64()
      return expect(testDataBuffer.getPosition()).to.be.eql(8)
    })
  })

  describe('readInt32', () => {
    it('should read the positive signed 32-bit int correctly from the buffer', () => {
      testDataBuffer = new DataBuffer(Buffer.from('082b1832', 'hex'))
      return expect(testDataBuffer.readInt32()).to.be.eql(137041970)
    })

    it('should read the negative signed 32-bit int correctly from the buffer', () => {
      testDataBuffer = new DataBuffer(Buffer.from('c22df034', 'hex'))
      return expect(testDataBuffer.readInt32()).to.be.eql(-1037176780)
    })

    it('should move the position of the DataBuffer 4 bytes after using readInt32', () => {
      testDataBuffer.readInt32()
      return expect(testDataBuffer.getPosition()).to.be.eql(4)
    })
  })

  describe('readUInt32', () => {
    it('should read the unsigned 32-bit int correctly from the buffer', () => {
      testDataBuffer = new DataBuffer(Buffer.from('082b1832', 'hex'))
      return expect(testDataBuffer.readUInt32()).to.be.eql(137041970)
    })

    it('should read large the unsigned 32-bit int correctly from the buffer', () => {
      testDataBuffer = new DataBuffer(Buffer.from('85f5e0ff', 'hex'))
      return expect(testDataBuffer.readUInt32()).to.be.eql(2247483647)
    })

    it('should move the position of the DataBuffer 4 bytes after using readUInt32', () => {
      testDataBuffer.readUInt32()
      return expect(testDataBuffer.getPosition()).to.be.eql(4)
    })
  })

  describe('readUInt16', () => {
    it('should read the unsigned 16-bit int correctly from the buffer', () => {
      testDataBuffer = new DataBuffer(Buffer.from('312e', 'hex'))
      return expect(testDataBuffer.readUInt16()).to.be.eql(12590)
    })

    it('should read the large unsigned 16-bit int correctly from the buffer', () => {
      testDataBuffer = new DataBuffer(Buffer.from('ffdc', 'hex'))
      return expect(testDataBuffer.readUInt16()).to.be.eql(65500)
    })

    it('should move the position of the DataBuffer 2 bytes after using readUInt16', () => {
      testDataBuffer.readUInt16()
      return expect(testDataBuffer.getPosition()).to.be.eql(2)
    })
  })

  describe('readUInt8', () => {
    it('should read the unsigned 8-bit int correctly from the buffer', () => {
      testDataBuffer = new DataBuffer(Buffer.from('6e', 'hex'))
      return expect(testDataBuffer.readUInt8()).to.be.eql(110)
    })

    it('should read the large unsigned 8-bit int correctly from the buffer', () => {
      testDataBuffer = new DataBuffer(Buffer.from('ea', 'hex'))
      return expect(testDataBuffer.readUInt8()).to.be.eql(234)
    })

    it('should move the position of the DataBuffer 1 byte after using readUInt8', () => {
      testDataBuffer.readUInt8()
      return expect(testDataBuffer.getPosition()).to.be.eql(1)
    })
  })
})
