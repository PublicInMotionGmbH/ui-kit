import applyClassNameModifiers from '../src/applyClassNameModifiers'
import config from '../config'

const _ = config.prefix

describe('@shared/applyClassNameModifiers', () => {
  it('should apply single modifier to class', () => {
    expect(applyClassNameModifiers('abc', 'def')).toBe(`${_}-abc--def`)
  })

  it('should apply many modifiers to class', () => {
    expect(applyClassNameModifiers('abc', [ 'def', 'ghi' ])).toBe(`${_}-abc--def ${_}-abc--ghi`)
  })

  it('should apply no modifiers to class', () => {
    expect(applyClassNameModifiers('abc')).toBe('')
    expect(applyClassNameModifiers('abc', 0)).toBe(`${_}-abc--0`)
    expect(applyClassNameModifiers('abc', false)).toBe(`${_}-abc--false`)
  })
})
