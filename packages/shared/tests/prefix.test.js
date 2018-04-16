import prefix from '../src/prefix'
import config from '../config'

const _ = config.prefix

describe('@shared/prefix', () => {
  it('should handle simple prefix correctly', () => {
    expect(prefix('abc')).toBe(`${_}-abc`)
    expect(prefix('abc__def')).toBe(`${_}-abc__def`)
  })

  it('should handle multi prefix correctly', () => {
    expect(prefix('abc', 'def', 'ghi')).toBe(`${_}-abc__def__ghi`)
  })
})
