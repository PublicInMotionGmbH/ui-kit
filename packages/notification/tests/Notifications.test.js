import React from 'react'
import Notifications from '../src/Notifications'
import { shallow } from 'enzyme'

describe('<Notifications />', () => {
  it('renders correctly one child', () => {
    const wrapper = shallow(
      <Notifications>
        <div id={0}>Notification</div>
      </Notifications>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders correctly children', () => {
    const wrapper = shallow(
      <Notifications>
        <div id={0}>Notification 1</div>
        <div id={1}>Notification 2</div>
        <div id={2}>Notification 3</div>
      </Notifications>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders .left correctly', () => {
    const wrapper = shallow(
      <Notifications className='left'>
        <div id={0}>Notification</div>
      </Notifications>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
