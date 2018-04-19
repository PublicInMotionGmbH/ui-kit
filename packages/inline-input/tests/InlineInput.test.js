import React from 'react'
import { shallow } from 'enzyme'

import InlineInput from '../src/InlineInput'

describe('<InlineInput />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<InlineInput />)

    expect(wrapper).toMatchSnapshot()
  })
})
