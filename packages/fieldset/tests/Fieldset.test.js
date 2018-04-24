import React from 'react'
import { shallow } from 'enzyme'

import Fieldset from '../src/Fieldset'

describe('<Fieldset />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Fieldset />)

    expect(wrapper).toMatchSnapshot()
  })
})
