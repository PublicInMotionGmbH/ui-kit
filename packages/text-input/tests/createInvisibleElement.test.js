import createInvisibleElement from '../src/utils/createInvisibleElement'

describe('createInvisibleElement', () => {
  it('should return DOM element', () => {
    expect(createInvisibleElement('')).toBeInstanceOf(window.HTMLElement)
  })

  it('should have correct text value', () => {
    expect(createInvisibleElement('').textContent).toBe('')
    expect(createInvisibleElement('blabla').textContent).toBe('blabla')
  })

  it('should replace spaces with non-breaking spaces', () => {
    const nbsp = String.fromCharCode(160)
    const example = ' there is something '
    const result = `${nbsp}there${nbsp}is${nbsp}something${nbsp}`

    expect(createInvisibleElement(example).textContent).toBe(result)
  })

  it('should replace condensed spaces with non-breaking spaces', () => {
    const nbsp = String.fromCharCode(160)
    const example = 'there       is!'
    const result = `there${nbsp}${nbsp}${nbsp}${nbsp}${nbsp}${nbsp}${nbsp}is!`

    expect(createInvisibleElement(example).textContent).toBe(result)
  })

  it('should not be visible', () => {
    const element = createInvisibleElement('there is something')

    document.body.appendChild(element)

    const styles = window.getComputedStyle(element)

    expect(styles.visibility).toBe('hidden')
    expect(styles.position).toBe('absolute')
    expect(styles.pointerEvents).toBe('none')

    document.body.removeChild(element)
  })
})
