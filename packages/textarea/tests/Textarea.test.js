import React from 'react'
import { shallow } from 'enzyme'

import Textarea from '../src/Textarea'

describe('<Textarea />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Textarea />)

    expect(wrapper).toMatchSnapshot()
  })
})
