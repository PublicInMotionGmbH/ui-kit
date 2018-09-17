import React from 'react'
import { shallow } from 'enzyme'

import Resizer from '../src/Resizer'

describe('<Resizer />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Resizer />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
