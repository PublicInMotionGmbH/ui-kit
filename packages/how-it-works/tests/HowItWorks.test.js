import React from 'react'
import { shallow } from 'enzyme'

import HowItWorks from '../src/HowItWorks'

describe('<HowItWorks />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<HowItWorks />)

    expect(wrapper).toMatchSnapshot()
  })
})
