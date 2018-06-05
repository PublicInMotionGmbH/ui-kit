import React from 'react'
import { shallow } from 'enzyme'

import Chat from '../src/Chat'

const messages = [
  {
    date: 1528104696738,
    message: 'This is message',
    user: 'John'
  },
  {
    date: 1528104730633,
    message: 'This is reply',
    user: 'Tom'
  }
]

describe('<Chat />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Chat messages={messages} />)

    expect(wrapper).toMatchSnapshot()
  })
})
