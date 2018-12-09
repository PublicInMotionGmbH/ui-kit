import calculateNearestMultiple from '../src/utils/calculateNearestMultiple'

describe('calculateNearestMultiple', () => {
  it('returns correct number', () => {
    expect(calculateNearestMultiple(1, 1)).toEqual(1)
    expect(calculateNearestMultiple(2, 1)).toEqual(2)
    expect(calculateNearestMultiple(1, 2)).toEqual(0)
    expect(calculateNearestMultiple(2, 2)).toEqual(2)
    expect(calculateNearestMultiple(5, 2)).toEqual(4)
    expect(calculateNearestMultiple(43, 10)).toEqual(40)
    expect(calculateNearestMultiple(789, 100)).toEqual(700)
  })
})
