import React from 'react'
import { shallow } from 'enzyme'

import TypingUsers from '../src/TypingUsers'

const typingUser = [{
  user: {
    name: 'John',
    id: '1'
  },
  status: true
}]

const typingUsers = [{
  user: {
    name: 'John',
    id: '1'
  },
  status: true
},
{
  user: {
    name: 'Kennedy',
    id: '4'
  },
  status: true
}]

const user = {
  name: 'mee',
  id: '3'
}

describe('<TypingUsers />', () => {
  it('renders component correctly', () => {
    const wrapper = shallow(<TypingUsers typingUsers={[]} user={user} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders no typing user correctly', () => {
    const wrapper = shallow(<TypingUsers typingUsers={[]} user={user} />)

    expect(wrapper.text()).toBe('')
  })

  it('renders one typing user correctly', () => {
    const wrapper = shallow(<TypingUsers typingUsers={typingUser} user={user} />)

    expect(wrapper.text()).toMatch(/is typing/)
  })

  it('renders two typing users correctly', () => {
    const wrapper = shallow(<TypingUsers typingUsers={typingUsers} user={user} />)

    expect(wrapper.text()).toMatch(/are typing/)
  })
})
