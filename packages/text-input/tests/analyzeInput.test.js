import analyzeInput from '../utils/analyzeInput'

describe('analyzeInput', () => {
  // we can't do better unit tests for analyze input on JSDOM,
  // as it doesn't have any window layout.
  it('should return correct hash', () => {
    const input = document.createElement('input')
    input.value = 'something'

    const suffix = document.createElement('span')

    const { hash, width } = analyzeInput(input, suffix)

    expect(hash).toBe(`${width.input}*${width.left}*${width.value}*${width.suffix}*${width.right}`)
  })
})
