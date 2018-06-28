import { getPositionNearElement } from '../utils/position'

describe('getPositionNearElement', () => {
  let getBoundingClientRect = window.Element.prototype.getBoundingClientRect

  beforeEach(() => {
    window.Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 100,
        height: 50,
        top: 50,
        left: 50,
        bottom: 0,
        right: 0
      }
    })
  })

  afterEach(() => {
    window.Element.prototype.getBoundingClientRect = getBoundingClientRect
  })

  it('returns right correctly', () => {
    const div = document.createElement('div')
    let state = getPositionNearElement(div, 'right', null, null, true)
    let expectedState = {
      top: '75px',
      left: '150px',
      position: 'right'
    }
    expect(state).toEqual(expectedState)
  })

  it('returns left correctly', () => {
    const div = document.createElement('div')
    let state = getPositionNearElement(div, 'left', null, null, true)
    let expectedState = {
      top: '75px',
      left: '50px',
      position: 'left'
    }
    expect(state).toEqual(expectedState)
  })

  it('returns top correctly', () => {
    const div = document.createElement('div')
    let state = getPositionNearElement(div, 'top', null, null, true)
    let expectedState = {
      top: '50px',
      left: '100px',
      position: 'top'
    }
    expect(state).toEqual(expectedState)
  })

  it('returns bottom correctly', () => {
    const div = document.createElement('div')
    let state = getPositionNearElement(div, 'bottom', null, null, true)
    let expectedState = {
      top: '100px',
      left: '100px',
      position: 'bottom'
    }
    expect(state).toEqual(expectedState)
  })
})
