'use strict'

import { AVLData } from './avl_data'
import { DataBuffer } from './data_buffer'

export class AVLDataArray {
  codecId: number
  avlDataLength: number
  avlDatas: AVLData[]

  constructor () {
    this.codecId = null
    this.avlDataLength = 0
    this.avlDatas = []
  }

  public static readNew (buffer: DataBuffer): AVLDataArray {
    const avlDataArray = new AVLDataArray()

    // Read codec ID
    avlDataArray.codecId = buffer.readUInt8()

    // Read getLength of AVL data array
    avlDataArray.avlDataLength = buffer.readUInt8()

    // Loop over AVL data array
    for (let i = 0; i < avlDataArray.avlDataLength; i++) {
      avlDataArray.avlDatas.push(AVLData.readNew(buffer))
    }

    // After the AVL data the getLength is written again
    const checkLength = buffer.readUInt8()

    if (avlDataArray.avlDataLength !== checkLength) {
      return null
    }

    return avlDataArray
  }
}
