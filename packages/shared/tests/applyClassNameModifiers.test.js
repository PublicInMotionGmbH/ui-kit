import applyClassNameModifiers from '../src/applyClassNameModifiers'
import config from '../config'

const _ = config.prefix

describe('@shared/applyClassNameModifiers', () => {
  it('should apply single modifier to class', () => {
    expect(applyClassNameModifiers('abc', 'def')).toEqual(`${_}-abc--def`)
  })

  it('should apply many modifiers to class', () => {
    expect(applyClassNameModifiers('abc', [ 'def', 'ghi' ])).toEqual(`${_}-abc--def ${_}-abc--ghi`)
  })

  it('should apply no modifiers to class', () => {
    expect(applyClassNameModifiers('abc')).toEqual('')
    expect(applyClassNameModifiers('abc', 0)).toEqual(`${_}-abc--0`)
    expect(applyClassNameModifiers('abc', false)).toEqual(`${_}-abc--false`)
  })
})
