import React from 'react'
import { shallow } from 'enzyme'

import Tree from '../src/Tree'

describe('<Tree />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Tree />)

    expect(wrapper).toMatchSnapshot()
  })
})
