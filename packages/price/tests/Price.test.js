import React from 'react'
import { shallow } from 'enzyme'

import Price from '../src/Price'
import { formatNumber, generatePrice, valueToFixedPrecision } from '../src/formatters'

// Helpers
const currencyToSymbol = {
  USD: '$',
  EUR: '€'
}

// Tests
describe('<Price />', () => {
  describe('<Price /> comoponent', () => {
    it('should render children correctly', () => {
      const wrapper = shallow(<Price currency='PLN' value={1000} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render price with curency before price', () => {
      const wrapper = shallow(<Price currency='GBP' value={1000} displayBefore />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render prefix correctly', () => {
      const wrapper = shallow(<Price currency='PLN' value={1000} prefix='about' />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render errorPlaceholder when wrong value is provided', () => {
      const wrapper = shallow(<Price currency='PLN' value='asd' />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('formatters', () => {
    describe('value to fixed precision', () => {
      it('should return "1.22" given 1.2222222', () => {
        expect(valueToFixedPrecision(1.2222222)).toBe('1.22')
      })

      it('should return "1.22" given "1.2222222"', () => {
        expect(valueToFixedPrecision('1.2222222')).toBe('1.22')
      })

      it('should return 2 given 1.500000', () => {
        expect(valueToFixedPrecision('1.500000', 0)).toBe('2')
      })

      it('should return 1.6 given 1.55', () => {
        expect(valueToFixedPrecision('1.55', 1)).toBe('1.6')
      })

      it('should return NaN when value is not a number', () => {
        expect(valueToFixedPrecision('adsadasd', 4)).toBe('NaN')
      })
    })

    describe('fomatNumber', () => {
      it('should return 1.222 given 1.2222321213', () => {
        expect(formatNumber('1.2222321213', 'en', 3)).toBe('1.222')
      })

      it('should return 1,000,000 given 1000000000.2121', () => {
        expect(formatNumber('1000000000.2121', 'en', 0)).toBe('1,000,000,000')
      })

      it('should return 1,000,000 given 1000000000.2121', () => {
        expect(formatNumber('1000000000.2121', 'en', 3)).toBe('1,000,000,000.212')
      })

      it('should return 1000000000.2121 given 1000000000.2121 when locale is null', () => {
        expect(formatNumber('1000000000.2121', null, 3)).toBe('1000000000.2121')
      })

      it('should return 1000000000.2121 given 1000000000 when precision is null', () => {
        expect(formatNumber('1000000000.2121', 'en', null)).toBe('1,000,000,000')
      })
    })

    describe('generatePrice', () => {
      it('should set error to true when provided value isNaN', () => {
        expect(generatePrice('asddsa').error).toBe(true)
      })

      it('should return mapped currency symbol and formatted value', () => {
        const result = generatePrice('100000', { currencyToSymbol, currency: 'USD' })
        expect(result.value).toBe('100,000')
        expect(result.symbol).toBe(currencyToSymbol['USD'])
        expect(result.error).toBe(undefined)
      })

      it('should return currency string when its not mapped and formatted value', () => {
        const result = generatePrice('100000', { currencyToSymbol, currency: 'PLN' })
        expect(result.value).toBe('100,000')
        expect(result.symbol).toBe('PLN')
        expect(result.error).toBe(undefined)
      })

      it('should return $100,000.12 given locale, value and currency', () => {
        const result = generatePrice('100000.12', { locale: 'en', currency: 'USD' })
        expect(result.value).toBe('100,000.12')
        expect(result.symbol).toBe('$')
        expect(result.displayBefore).toBe(true)
        expect(result.error).toBe(undefined)
      })

      it('should return 100,000.12 and USD given value and currency and locale but when error occurs', () => {
        const _backup = Intl.NumberFormat
        Intl.NumberFormat = undefined
        const result = generatePrice('100000.12', { locale: 'en', currency: 'USD' })
        expect(result.value).toBe('100000.12')
        expect(result.symbol).toBe('USD')
        expect(result.error).toBe(undefined)
        Intl.NumberFormat = _backup
      })
    })
  })
})
