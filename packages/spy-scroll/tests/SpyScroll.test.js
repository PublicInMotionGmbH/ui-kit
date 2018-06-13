import React from 'react'
import { shallow } from 'enzyme'

import SpyScroll from '../src/SpyScroll'

describe('<SpyScroll />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<SpyScroll />)

    expect(wrapper).toMatchSnapshot()
  })
})
