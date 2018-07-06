import drawStroke from '../src/drawStroke'

describe('drawStroke function', () => {
  it('returns correct value when pass negative value as parameter', () => {
    expect(drawStroke(-1)).toBe(164)
  })

  it('returns correct value when pass 0 as parameter', () => {
    expect(drawStroke(0)).toBe(164)
  })

  it('returns correct value when pass 0.5 as parameter', () => {
    expect(drawStroke(0.5)).toBe(82)
  })

  it('returns correct value when pass 1 as parameter', () => {
    expect(drawStroke(1)).toBe(0)
  })

  it('returns correct value when pass greater than 1 as parameter', () => {
    expect(drawStroke(3)).toBe(0)
  })

  it('returns correct value when pass string as parameter', () => {
    expect(drawStroke('someText')).toBe(null)
  })
})
