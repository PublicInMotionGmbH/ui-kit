import React from 'react'
import NotificationsList from '../src/NotificationsList'
import { shallow } from 'enzyme'

describe('<NotificationsList />', () => {
  it('renders correctly one child', () => {
    const wrapper = shallow(
      <NotificationsList>
        <div id={0}>Notification</div>
      </NotificationsList>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders correctly children', () => {
    const wrapper = shallow(
      <NotificationsList>
        <div id={0}>Notification 1</div>
        <div id={1}>Notification 2</div>
        <div id={2}>Notification 3</div>
      </NotificationsList>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders .left correctly', () => {
    const wrapper = shallow(
      <NotificationsList className='left'>
        <div id={0}>Notification</div>
      </NotificationsList>
    )

    const className = wrapper.props().children.props.className
    expect(className).toContain('left')
  })
})
