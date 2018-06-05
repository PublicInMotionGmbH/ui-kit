import React from 'react'
import { shallow } from 'enzyme'

import Chat from '../src/Chat'

describe('<Chat />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Chat />)

    expect(wrapper).toMatchSnapshot()
  })
})
