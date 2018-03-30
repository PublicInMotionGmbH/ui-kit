import React from 'react'
import NotificationList from '../src/NotificationList'
import { shallow } from 'enzyme'

describe('<NotificationList />', () => {
  it('renders correctly one child', () => {
    const wrapper = shallow(
      <NotificationList>
        <div id={0}>Notification</div>
      </NotificationList>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders correctly children', () => {
    const wrapper = shallow(
      <NotificationList>
        <div id={0}>Notification 1</div>
        <div id={1}>Notification 2</div>
        <div id={2}>Notification 3</div>
      </NotificationList>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders .left correctly', () => {
    const wrapper = shallow(
      <NotificationList className='left'>
        <div id={0}>Notification</div>
      </NotificationList>
    )

    const className = wrapper.props().children.props.className
    expect(className).toContain('left')
  })
})
