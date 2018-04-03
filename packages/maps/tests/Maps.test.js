import React from 'react'
import { shallow } from 'enzyme'

import Maps from '../src/Maps'

describe('<Maps />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Maps />)

    expect(wrapper).toMatchSnapshot()
  })
})
