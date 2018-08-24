import React from 'react'
import { shallow } from 'enzyme'

import Timeline from '../src/Timeline'

describe('<Timeline />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Timeline />)

    expect(wrapper).toMatchSnapshot()
  })
})
