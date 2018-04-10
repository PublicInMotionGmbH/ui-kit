import React from 'react'
import { shallow } from 'enzyme'

import Directions from '../src/Directions'

describe('<Directions />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Directions directions={{}} />)

    expect(wrapper).toMatchSnapshot()
  })
})
