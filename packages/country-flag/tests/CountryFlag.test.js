import React from 'react'
import { shallow } from 'enzyme'

import CountryFlag from '../src/CountryFlag'

describe('<CountryFlag />', () => {
  it('renders flag correctly', () => {
    const wrapper = shallow(<CountryFlag code='pl' />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should allow passing other props down', () => {
    const wrapper = shallow(<CountryFlag code='de' className='something' />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should lower-case country code', () => {
    const wrapper = shallow(<CountryFlag code='PL' />)

    expect(wrapper).toMatchSnapshot()
  })
})
