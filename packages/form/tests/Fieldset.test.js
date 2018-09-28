import React from 'react'
import { mount } from 'enzyme'

import Fieldset from '../src/Fieldset'

describe('<Fieldset />', () => {
  it('renders children correctly', () => {
    const wrapper = mount(<Fieldset />)

    expect(wrapper).toMatchSnapshot()
  })
})
