'use strict'

import * as chai from 'chai'
import { DataBuffer } from '../../src/model/data_buffer'
import { GPSElement } from '../../src/model/gps_element'

const expect = chai.expect

describe('AVLData', () => {
  describe('readNew', () => {
    describe('Location in 1 quadrant', () => {
      const testDataBuffer = new DataBuffer(Buffer.from('082b183222006e380007000a080000', 'hex'))
      const parsedGpsElement = GPSElement.readNew(testDataBuffer)

      it('should parse the longitude correctly', () => {
        return expect(parsedGpsElement.longitude).to.be.eql(13.704197)
      })

      it('should parse the latitude correctly', () => {
        return expect(parsedGpsElement.latitude).to.be.eql(57.045356)
      })

      it('should parse the altitude correctly', () => {
        return expect(parsedGpsElement.altitude).to.be.eql(7)
      })

      it('should parse the angle correctly', () => {
        return expect(parsedGpsElement.angle).to.be.eql(10)
      })

      it('should parse the satellites correctly', () => {
        return expect(parsedGpsElement.satellites).to.be.eql(8)
      })

      it('should parse the speed correctly', () => {
        return expect(parsedGpsElement.speed).to.be.eql(0)
      })
    })

    describe('Location in 2 quadrant', () => {
      const testDataBuffer = new DataBuffer(Buffer.from('c22df0341739be3c0000004e09000d', 'hex'))
      const parsedGpsElement = GPSElement.readNew(testDataBuffer)

      it('should parse the longitude correctly', () => {
        return expect(parsedGpsElement.longitude).to.be.eql(-103.717678)
      })

      it('should parse the latitude correctly', () => {
        return expect(parsedGpsElement.latitude).to.be.eql(38.966022)
      })

      it('should parse the altitude correctly', () => {
        return expect(parsedGpsElement.altitude).to.be.eql(0)
      })

      it('should parse the angle correctly', () => {
        return expect(parsedGpsElement.angle).to.be.eql(78)
      })

      it('should parse the satellites correctly', () => {
        return expect(parsedGpsElement.satellites).to.be.eql(9)
      })

      it('should parse the speed correctly', () => {
        return expect(parsedGpsElement.speed).to.be.eql(13)
      })
    })

    describe('Location in 3 quadrant', () => {
      const testDataBuffer = new DataBuffer(Buffer.from('d6b71166f02812bc007b00ba05006c', 'hex'))
      const parsedGpsElement = GPSElement.readNew(testDataBuffer)

      it('should parse the longitude correctly', () => {
        return expect(parsedGpsElement.longitude).to.be.eql(-69.264553)
      })

      it('should parse the latitude correctly', () => {
        return expect(parsedGpsElement.latitude).to.be.eql(-26.580922)
      })

      it('should parse the altitude correctly', () => {
        return expect(parsedGpsElement.altitude).to.be.eql(123)
      })

      it('should parse the angle correctly', () => {
        return expect(parsedGpsElement.angle).to.be.eql(186)
      })

      it('should parse the satellites correctly', () => {
        return expect(parsedGpsElement.satellites).to.be.eql(5)
      })

      it('should parse the speed correctly', () => {
        return expect(parsedGpsElement.speed).to.be.eql(108)
      })
    })

    describe('Location in 4 quadrant', () => {
      const testDataBuffer = new DataBuffer(Buffer.from('580186fcea4633e20019011e06000c', 'hex'))
      const parsedGpsElement = GPSElement.readNew(testDataBuffer)

      it('should parse the longitude correctly', () => {
        return expect(parsedGpsElement.longitude).to.be.eql(147.64951)
      })

      it('should parse the latitude correctly', () => {
        return expect(parsedGpsElement.latitude).to.be.eql(-36.449795)
      })

      it('should parse the altitude correctly', () => {
        return expect(parsedGpsElement.altitude).to.be.eql(25)
      })

      it('should parse the angle correctly', () => {
        return expect(parsedGpsElement.angle).to.be.eql(286)
      })

      it('should parse the satellites correctly', () => {
        return expect(parsedGpsElement.satellites).to.be.eql(6)
      })

      it('should parse the speed correctly', () => {
        return expect(parsedGpsElement.speed).to.be.eql(12)
      })
    })
  })
})
