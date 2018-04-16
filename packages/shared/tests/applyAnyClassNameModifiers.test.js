import applyAnyClassNameModifiers from '../src/applyAnyClassNameModifiers'
import config from '../config'

const _ = config.prefix

describe('@shared/applyAnyClassNameModifiers', () => {
  it('should apply single modifier to class', () => {
    expect(applyAnyClassNameModifiers('abc', 'def')).toBe(`${_}-abc--def`)
  })

  it('should apply many modifiers to class', () => {
    expect(applyAnyClassNameModifiers('abc', [ 'def', 'ghi' ])).toBe(`${_}-abc--def ${_}-abc--ghi`)
  })

  it('should apply no modifiers to class', () => {
    expect(applyAnyClassNameModifiers('abc')).toBe('')
    expect(applyAnyClassNameModifiers('abc', 0)).toBe(`${_}-abc--0`)
    expect(applyAnyClassNameModifiers('abc', false)).toBe(`${_}-abc--false`)
  })

  it('should apply conditional modifiers', () => {
    const modifiers = {
      a: true,
      b: 10,
      c: false,
      d: 0,
      e: ''
    }

    expect(applyAnyClassNameModifiers('abc', modifiers)).toBe(`${_}-abc--a ${_}-abc--b`)
  })
})
