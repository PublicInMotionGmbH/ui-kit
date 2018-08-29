import React from 'react'
import { shallow } from 'enzyme'

import Columns from '../src/Columns'

describe('<Columns />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Columns />)

    expect(wrapper).toMatchSnapshot()
  })
})
