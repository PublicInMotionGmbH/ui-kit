import React from 'react'
import { shallow } from 'enzyme'

import Carousel from '../src/Carousel'

describe('<Carousel />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Carousel />)

    expect(wrapper).toMatchSnapshot()
  })
})
