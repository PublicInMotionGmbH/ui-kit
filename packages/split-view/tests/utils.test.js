import { formatKey } from '../src/utils'

const testArray = ['test-key', 'test_key', 'testKey']
const resultArray = 'Test key'

describe('Format keys utility', () => {
  it('should change string properly', () => {
    for (let i = 0; i < testArray.length; i++) {
      expect(formatKey(testArray[i])).toEqual(resultArray)
    }
  })
})
