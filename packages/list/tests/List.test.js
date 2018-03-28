import React from 'react'
import List from '../src/List'
import { shallow } from 'enzyme'

describe('<List />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <List bullet='#'>
        <span>Home</span>
        <span>Help</span>
        <span>Issues</span>
        <span>Log In</span>
      </List>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
