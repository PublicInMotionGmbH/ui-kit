import React from 'react'
import { shallow } from 'enzyme'

import MaskedInput from '../src/MaskedInput'

describe('<MaskedInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<MaskedInput />)

    expect(wrapper).toMatchSnapshot()
  })
})
