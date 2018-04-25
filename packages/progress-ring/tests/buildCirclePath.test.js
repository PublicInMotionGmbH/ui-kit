import buildCirclePath from '../utils/buildCirclePath'

describe('buildCirclePath', () => {
  it('should calculate correct path for empty progress', () => {
    expect(buildCirclePath(0)).toBe('M 1 0 A 1 1 0 0 1 1 0 L 0 0')
  })

  it('should calculate correct path for 25%', () => {
    expect(buildCirclePath(0.25)).toBe('M 1 0 A 1 1 0 0 1 6.123233995736766e-17 1 L 0 0')
  })

  it('should calculate correct path for 35%', () => {
    expect(buildCirclePath(0.35)).toBe('M 1 0 A 1 1 0 0 1 -0.587785252292473 0.8090169943749475 L 0 0')
  })

  it('should calculate correct path for 50%', () => {
    expect(buildCirclePath(0.50)).toBe('M 1 0 A 1 1 0 0 1 -1 1.2246467991473532e-16 L 0 0')
  })

  it('should calculate correct path for 60%', () => {
    expect(buildCirclePath(0.6)).toBe('M 1 0 A 1 1 0 1 1 -0.8090169943749475 -0.587785252292473 L 0 0')
  })

  it('should calculate correct path for 75%', () => {
    expect(buildCirclePath(0.75)).toBe('M 1 0 A 1 1 0 1 1 -1.8369701987210297e-16 -1 L 0 0')
  })

  it('should calculate correct path for 99.9%', () => {
    expect(buildCirclePath(0.999)).toBe('M 1 0 A 1 1 0 1 1 0.9999802608561371 -0.006283143965558805 L 0 0')
  })

  it('should calculate correct path for 100%', () => {
    expect(buildCirclePath(1)).toBe('M 1 0 A 1 1 0 1 1 1 -2.4492935982947064e-16 L 0 0')
  })
})
