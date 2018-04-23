import React from 'react'
import { shallow } from 'enzyme'

import ComboBox from '../src/ComboBox'

describe('<ComboBox />', () => {
  xit('renders children correctly', () => {
    const wrapper = shallow(<ComboBox />)

    expect(wrapper).toMatchSnapshot()
  })
})
