import React from 'react'
import { shallow } from 'enzyme'

import Countdown from '../src/Countdown'

describe('<Countdown />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Countdown />)

    expect(wrapper).toMatchSnapshot()
  })
})
