import React from 'react'
import { shallow } from 'enzyme'

import TimePicker from '../src/TimePicker'

describe('<TimePicker />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<TimePicker />)

    expect(wrapper).toMatchSnapshot()
  })
})
