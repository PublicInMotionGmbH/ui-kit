import { getDataTransferFiles, formatBytes } from '../src/utils'

describe('FileInput utils', () => {
  describe('format Bytes', () => {
    const input = [
      'test',
      0, // 0 B
      10, // 10 B
      1024, // KB
      1024 * 1024, // MB
      1024 * 1024 * 1024, // GB
      1024 * 1024 * 1024 * 1024, // TB
      1024 * 1024 * 1024 * 1024 * 1024, // PB
      1024 * 1024 * 1024 * 1024 * 1024 * 1024, // EB
      1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024, // ZB
      1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024, // YB
      1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 // YB
    ]
    const result = [
      'n/a',
      '0 B',
      '10 B',
      '1 KB',
      '1 MB',
      '1 GB',
      '1 TB',
      '1 PB',
      '1 EB',
      '1 ZB',
      '1 YB',
      '1024 YB'
    ]
    it('should return proper string', () => {
      input.forEach((item, index) => {
        expect(formatBytes(item)).toBe(result[index])
      })
    })
  })

  describe('getDataTransferFiles', () => {
    const input = [
      {},
      { dataTransfer: { files: { name: 'Test', size: 123321 } } },
      { dataTransfer: {} },
      { target: { files: { name: 'Test', size: 123321 } } },
      { target: {} }
    ]
    const result = [
      null,
      { name: 'Test', size: 123321 },
      null,
      { name: 'Test', size: 123321 },
      null
    ]

    it('should return proper string', () => {
      input.forEach((item, index) => {
        expect(getDataTransferFiles(item)).toEqual(result[index])
      })
    })
  })
})
