import React from 'react'
import { shallow } from 'enzyme'

import Charts from '../src/Charts'

describe('<Charts />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Charts />)
    expect(wrapper).toMatchSnapshot()
  })
})
