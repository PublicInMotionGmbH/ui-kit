import React from 'react'
import { shallow } from 'enzyme'

import Wizard from '../src/Wizard'

describe('<Wizard />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Wizard />)

    expect(wrapper).toMatchSnapshot()
  })
})
