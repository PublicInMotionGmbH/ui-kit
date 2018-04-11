import React from 'react'
import { shallow } from 'enzyme'

import Portal from '../src/Portal'

describe('<Portal />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Portal />)

    expect(wrapper).toMatchSnapshot()
  })
})
