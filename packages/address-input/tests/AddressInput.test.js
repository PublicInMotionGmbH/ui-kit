import React from 'react'
import { shallow } from 'enzyme'

import AddressInput from '../src/AddressInput'

describe('<AddressInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<AddressInput />)

    expect(wrapper).toMatchSnapshot()
  })
})
