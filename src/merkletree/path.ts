import { UnableToBuildPathError } from '.'

export type Path = string

export const LEFT = '1'
export const RIGHT = '0'

const halfBucket = (from: number): number =>
  Math.pow(2, Math.ceil(Math.log(from) / Math.log(2))) / 2

/**
 *  
 * @param {number} index - The leaf index
 * @param {number} size - The size of the Merkle tree
 * @param {number} depth - The depth of the Merkle tree
 * @returns the path code
 */
export const buildPath = (index: number, size: number, depth: number): Path => {
  let path = ''
  const initialDepth = depth
  while (size > 0 && depth > 0) {
    const half = halfBucket(size)
    if (index < half) {
      path += LEFT
      size = Math.max(half, 1)
    } else {
      path += RIGHT
      index -= half
      if (size - half * 2 === 0) {
        size = Math.max(half, 1)
      } else {
        size = size - half
      }
    }
    depth--
  }
  if (path.length !== initialDepth) {
    throw new UnableToBuildPathError(path)
  }
  return path
}