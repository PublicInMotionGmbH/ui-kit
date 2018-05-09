import React from 'react'
import { shallow } from 'enzyme'

import OptionsInput from '../src/OptionsInput'

describe('<OptionsInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<OptionsInput />)

    expect(wrapper).toMatchSnapshot()
  })
})
