import React from 'react'
import { shallow } from 'enzyme'

import ColorInput from '../src/ColorInput'

describe('<ColorInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<ColorInput />)

    expect(wrapper).toMatchSnapshot()
  })
})
