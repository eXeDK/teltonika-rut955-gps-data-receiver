'use strict'

const INT8_LENGTH = 1
const INT16_LENGTH = 2
const INT32_LENGTH = 4
const INT64_LENGTH = 8

export class DataBuffer {
  private position = 0

  constructor (private data: Buffer) {}

  public getBuffer (): Buffer {
    return this.data
  }

  public getLength (): number {
    return this.data.length
  }

  public getPosition (): number {
    return this.position
  }

  public readBytes (length): Buffer {
    const returnBuffer = this.data.slice(this.position, this.position + length)
    this.position = this.position + length
    return returnBuffer
  }

  public readUInt64 (): number {
    const result = this.data.readUIntBE(this.position, INT64_LENGTH)
    this.position = this.position + INT64_LENGTH
    return result
  }

  public readInt32 (): number {
    const result = this.data.readInt32BE(this.position)
    this.position = this.position + INT32_LENGTH
    return result
  }

  public readUInt32 (): number {
    const result = this.data.readUInt32BE(this.position)
    this.position = this.position + INT32_LENGTH
    return result
  }

  public readUInt16 (): number {
    const result = this.data.readUInt16BE(this.position)
    this.position = this.position + INT16_LENGTH
    return result
  }

  public readUInt8 (): number {
    const result = this.data.readUInt8(this.position)
    this.position = this.position + INT8_LENGTH
    return result
  }
}
