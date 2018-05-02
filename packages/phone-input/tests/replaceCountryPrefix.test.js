import replaceCountryPrefix from '../utils/replaceCountryPrefix'

describe('replaceCountryPrefix', () => {
  it('should return same phone number when there is no country detected', () => {
    expect(replaceCountryPrefix('4494493', null, null)).toBe('4494493')
  })

  it('should return only prefix when there is no phone number', () => {
    expect(replaceCountryPrefix(null, null, { prefix: '+49' })).toBe('+49 ')
  })

  it('should replace previous country prefix with new one', () => {
    expect(replaceCountryPrefix('+48222222', { prefix: '+48' }, { prefix: '+49' })).toBe('+49222222')
  })

  it('should add new country prefix when there was no previous', () => {
    expect(replaceCountryPrefix('222222', null, { prefix: '+49' })).toBe('+49222222')
  })

  it('should not add new country prefix when it is the same', () => {
    expect(replaceCountryPrefix('+49222222', null, { prefix: '+49' })).toBe('+49222222')
  })
})
