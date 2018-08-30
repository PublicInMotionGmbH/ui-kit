import React from 'react'
import { shallow } from 'enzyme'

import Optional from '../src/Optional'

describe('<Optional />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Optional />)

    expect(wrapper).toMatchSnapshot()
  })
})
