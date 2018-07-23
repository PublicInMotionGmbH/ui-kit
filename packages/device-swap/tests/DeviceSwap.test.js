import React from 'react'
import { shallow } from 'enzyme'

import DeviceSwap from '../src/DeviceSwap'

describe('<DeviceSwap />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<DeviceSwap />)

    expect(wrapper).toMatchSnapshot()
  })
})
