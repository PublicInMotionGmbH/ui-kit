import React from 'react'
import { shallow } from 'enzyme'

import Price from '../src/Price'

describe('<Price />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Price />)

    expect(wrapper).toMatchSnapshot()
  })
})
