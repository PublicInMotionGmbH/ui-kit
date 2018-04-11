import React from 'react'
import { shallow } from 'enzyme'

import Calendar from '../src/Calendar'

describe('<Calendar />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Calendar />)

    expect(wrapper).toMatchSnapshot()
  })
})
