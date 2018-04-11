import buildClassName from '../src/buildClassName'
import config from '../config'

const _ = config.prefix

describe('@shared/buildClassName', () => {
  it('should apply single modifier to class', () => {
    expect(buildClassName('abc', null, 'def')).toEqual(`${_}-abc ${_}-abc--def`)
  })

  it('should apply many modifiers to class', () => {
    expect(buildClassName('abc', null, [ 'def', 'ghi' ])).toEqual(`${_}-abc ${_}-abc--def ${_}-abc--ghi`)
  })

  it('should apply no modifiers to class', () => {
    expect(buildClassName('abc')).toEqual(`${_}-abc`)
    expect(buildClassName('abc', null, 0)).toEqual(`${_}-abc ${_}-abc--0`)
    expect(buildClassName('abc', null, false)).toEqual(`${_}-abc ${_}-abc--false`)
  })

  it('should apply conditional modifiers', () => {
    const modifiers = {
      a: true,
      b: 10,
      c: false,
      d: 0,
      e: ''
    }

    expect(buildClassName('abc', null, modifiers)).toEqual(`${_}-abc ${_}-abc--a ${_}-abc--b`)
  })

  it('should allow additional class name', () => {
    const modifiers = {
      a: true,
      b: 10,
      c: false,
      d: 0,
      e: ''
    }

    expect(buildClassName('abc', 'blabla', modifiers)).toEqual(`${_}-abc blabla ${_}-abc--a ${_}-abc--b`)
    expect(buildClassName('abc', 'blabla', [ 'def', 'ghi' ])).toEqual(`${_}-abc blabla ${_}-abc--def ${_}-abc--ghi`)
    expect(buildClassName('abc', 'blabla')).toEqual(`${_}-abc blabla`)
  })

  it('should allow many modifiers', () => {
    const modifiers = {
      a: true,
      b: 10,
      c: false,
      d: 0,
      e: ''
    }

    const className = buildClassName(
      'abc',
      'blabla',
      modifiers,
      'def',
      [ 'ghi', 'jkl' ]
    )

    expect(className).toEqual(`${_}-abc blabla ${_}-abc--a ${_}-abc--b ${_}-abc--def ${_}-abc--ghi ${_}-abc--jkl`)
  })
})
