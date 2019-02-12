import calculateInputStyles from '../src/utils/calculateInputStyles'
/*

  'fontSize', 'fontFamily', 'fontWeight', 'fontStyle',
  'letterSpacing', 'textTransform', 'color'
 */
describe('calculateInputStyles', () => {
  // we can't do better unit tests for analyze input on JSDOM,
  // as it doesn't have any window layout.
  it('should return correct hash', () => {
    const input = document.createElement('input')
    input.value = 'something'

    const suffix = document.createElement('span')

    const result = calculateInputStyles(input, suffix)

    expect(typeof result.hash).toBe('string')
  })

  it('should copy simple font styles to suffix', () => {
    const input = document.createElement('input')

    input.style.fontSize = '16px'
    input.style.fontFamily = 'Arial'
    input.style.textTransform = 'uppercase'
    input.style.fontWeight = 'bold'
    input.style.fontStyle = 'italic'
    input.style.letterSpacing = '1px'
    input.style.color = 'red'

    const suffix = document.createElement('span')

    const result = calculateInputStyles(input, suffix)

    expect(result.suffix.fontSize).toBe('16px')
    expect(result.suffix.fontFamily).toBe('Arial')
    expect(result.suffix.textTransform).toBe('uppercase')
    expect(result.suffix.fontWeight).toBe('bold')
    expect(result.suffix.fontStyle).toBe('italic')
    expect(result.suffix.letterSpacing).toBe('1px')
    expect(result.suffix.color).toBe('red')
  })

  it('should extract condensed font styles', () => {
    const input = document.createElement('input')

    input.style.font = '160px Arial'

    const suffix = document.createElement('span')

    const result = calculateInputStyles(input, suffix)

    expect(result.suffix.fontSize).toBe('160px')
    expect(result.suffix.fontFamily).toBe('Arial')
  })

  it('should calculate padding for input', () => {
    const input = document.createElement('input')
    const suffix = document.createElement('span')

    input.style.paddingLeft = '0px'
    input.style.paddingRight = '0px'
    suffix.style.width = '3px'

    const result = calculateInputStyles(input, suffix)

    expect(result.input.paddingRight).toBe(3)
    expect(result.input.paddingLeft).toBeFalsy()
  })

  it('should calculate padding for input', () => {
    const input = document.createElement('input')
    const suffix = document.createElement('span')

    input.style.paddingLeft = '0px'
    input.style.paddingRight = '4px'
    suffix.style.width = '3px'

    const result = calculateInputStyles(input, suffix)

    expect(result.input.paddingRight).toBe(7)
    expect(result.input.paddingLeft).toBeFalsy()
  })

  it('should calculate suffix position', () => {
    const input = document.createElement('input')
    const suffix = document.createElement('span')

    const result = calculateInputStyles(input, suffix)

    expect(result.suffix.right).toBeFalsy()
    expect(result.suffix.left).toBeTruthy()
  })

  it('should calculate suffix position for RTL input', () => {
    const input = document.createElement('input')
    input.style.direction = 'rtl'
    const suffix = document.createElement('span')

    const result = calculateInputStyles(input, suffix)

    expect(result.suffix.left).toBeFalsy()
    expect(result.suffix.right).toBeTruthy()
  })
})
