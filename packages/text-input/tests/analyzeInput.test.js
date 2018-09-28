import analyzeInput from '../utils/analyzeInput'

describe('analyzeInput', () => {
  // we can't do better unit tests for analyze input on JSDOM,
  // as it doesn't have any window layout.
  it('should return correct hash when suffix is passed', () => {
    const input = document.createElement('input')
    input.value = 'something'

    const suffix = document.createElement('span')
    const left = document.createElement('span')
    const right = document.createElement('span')

    const { hash, width } = analyzeInput(input, suffix, left, right)

    expect(hash).toBe(`ltr*${width.input}*${width.left}*${width.value}*${width.suffix}*${width.right}`)
  })

  it('should return correct hash when suffix is passed and padding is applied', () => {
    const input = document.createElement('input')
    input.value = 'something'
    input.style.paddingLeft = '10px'
    input.style.paddingRight = '10px'

    const suffix = document.createElement('span')
    const left = document.createElement('span')
    const right = document.createElement('span')

    const { hash, width } = analyzeInput(input, suffix, left, right)
    expect(hash).toBe(`ltr*${width.input}*${width.left}*${width.value}*${width.suffix}*${width.right}`)
  })

  it('should return correct hash when suffix is not passed and padding is applied', () => {
    const input = document.createElement('input')
    input.value = 'something'
    input.style.paddingLeft = '10px'
    input.style.paddingRight = '10px'

    const left = document.createElement('span')
    const right = document.createElement('span')

    const { hash, width } = analyzeInput(input, null, left, right)
    expect(hash).toBe(`ltr*${width.input}*${width.left}*${width.value}*${width.suffix}*${width.right}`)
  })

  it('should correctly detect RTL direction', () => {
    const input = document.createElement('input')
    input.style.direction = 'rtl'
    input.value = 'something'

    const suffix = document.createElement('span')
    const left = document.createElement('span')
    const right = document.createElement('span')

    const { hash, width } = analyzeInput(input, suffix, left, right)

    expect(hash).toBe(`rtl*${width.input}*${width.left}*${width.value}*${width.suffix}*${width.right}`)
  })

  it('should return correct hash when suffix is not passed and padding is applied, RTL', () => {
    const input = document.createElement('input')
    input.style.direction = 'rtl'
    input.value = 'something'
    input.style.paddingLeft = '10px'
    input.style.paddingRight = '10px'

    const left = document.createElement('span')
    const right = document.createElement('span')

    const { hash, width } = analyzeInput(input, null, left, right)
    expect(hash).toBe(`rtl*${width.input}*${width.left}*${width.value}*${width.suffix}*${width.right}`)
  })
})
