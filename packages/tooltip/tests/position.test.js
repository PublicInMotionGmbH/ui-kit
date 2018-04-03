import { getPositionNearElement } from '../utils/position'

describe('getPositionNearElement', () => {
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

  it('returns right correctly', () => {
    const div = document.createElement('div')
    let state = getPositionNearElement(div, 'right')
    let expectedState = {
      top: '75px',
      left: '150px'
    }
    expect(state).toEqual(expectedState)
  })

  it('returns left correctly', () => {
    const div = document.createElement('div')
    let state = getPositionNearElement(div, 'left')
    let expectedState = {
      top: '75px',
      left: '50px'
    }
    expect(state).toEqual(expectedState)
  })

  it('returns top correctly', () => {
    const div = document.createElement('div')
    let state = getPositionNearElement(div, 'top')
    let expectedState = {
      top: '50px',
      left: '100px'
    }
    expect(state).toEqual(expectedState)
  })

  it('returns bottom correctly', () => {
    const div = document.createElement('div')
    let state = getPositionNearElement(div, 'bottom')
    let expectedState = {
      top: '100px',
      left: '100px'
    }
    expect(state).toEqual(expectedState)
  })
})
