import isEvent from '../utils/isEvent'

describe('isEvent', () => {
  it('should detect native event', () => {
    expect(isEvent(new window.Event('resize'))).toBeTruthy()
  })

  it('should detect native mouse event', () => {
    expect(isEvent(new window.MouseEvent('click'))).toBeTruthy()
  })

  it('should detect that object similar to event as not event', () => {
    expect(isEvent({ target: { value: 10 } })).toBeFalsy()
  })

  it('should detect that regular values are not events', () => {
    expect(isEvent(10)).toBeFalsy()
    expect(isEvent('str')).toBeFalsy()
    expect(isEvent(null)).toBeFalsy()
    expect(isEvent({})).toBeFalsy()
    expect(isEvent({ x: 10 })).toBeFalsy()
  })
})
