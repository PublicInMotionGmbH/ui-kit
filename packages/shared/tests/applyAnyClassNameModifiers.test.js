import applyAnyClassNameModifiers from '../src/applyAnyClassNameModifiers'
import config from '../config'

const _ = config.prefix

describe('@shared/applyAnyClassNameModifiers', () => {
  it('should apply single modifier to class', () => {
    expect(applyAnyClassNameModifiers('abc', 'def')).toEqual(`${_}-abc--def`)
  })

  it('should apply many modifiers to class', () => {
    expect(applyAnyClassNameModifiers('abc', [ 'def', 'ghi' ])).toEqual(`${_}-abc--def ${_}-abc--ghi`)
  })

  it('should apply no modifiers to class', () => {
    expect(applyAnyClassNameModifiers('abc')).toEqual('')
    expect(applyAnyClassNameModifiers('abc', 0)).toEqual(`${_}-abc--0`)
    expect(applyAnyClassNameModifiers('abc', false)).toEqual(`${_}-abc--false`)
  })

  it('should apply conditional modifiers', () => {
    const modifiers = {
      a: true,
      b: 10,
      c: false,
      d: 0,
      e: ''
    }

    expect(applyAnyClassNameModifiers('abc', modifiers)).toEqual(`${_}-abc--a ${_}-abc--b`)
  })
})
