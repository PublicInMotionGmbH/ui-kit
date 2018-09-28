import React from 'react'
import { shallow, mount } from 'enzyme'

import { prefix } from '@talixo/shared'

import NotificationList from '../src/NotificationList'

const name = prefix('notifications-list')

describe('<NotificationList />', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

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
      <NotificationList
        items={[
          { content: 'Notification 1', type: 'error' },
          { content: 'Notification 2' },
          { content: 'Notification 3', type: 'success', id: '10' }
        ]}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders additional class correctly', () => {
    const wrapper = shallow(
      <NotificationList className='left'>
        <div id={0}>Notification</div>
      </NotificationList>
    )

    const className = wrapper.props().className
    expect(className).toContain('left')
  })

  it('should call global onClose when notification is closed', () => {
    const items = [
      { content: 'Notification 1', type: 'error' },
      { content: 'Notification 2' },
      { content: 'Notification 3', type: 'success', id: '10' }
    ]

    const spy = jest.fn()

    const wrapper = shallow(
      <NotificationList
        items={items}
        onClose={spy}
      />
    )

    wrapper.find('Notification').at(0).props().onClose()

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0][0]).toBe(items[0])

    wrapper.find('Notification').at(2).props().onClose()

    expect(spy.mock.calls.length).toBe(2)
    expect(spy.mock.calls[1][0]).toEqual(items[2])
  })

  it('should call global and local onClose when notification is closed', () => {
    const local = jest.fn()
    const spy = jest.fn()

    const items = [
      { content: 'Notification 1', type: 'error', onClose: local },
      { content: 'Notification 2' },
      { content: 'Notification 3', type: 'success', id: '10' }
    ]

    const wrapper = shallow(
      <NotificationList
        items={items}
        onClose={spy}
      />
    )

    wrapper.find('Notification').at(0).props().onClose()

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0][0]).toBe(items[0])

    expect(local.mock.calls.length).toBe(1)
    expect(local.mock.calls[0][0]).toBe(items[0])
  })

  it('should change visible items', () => {
    const items = [
      { content: 'Notification 1', type: 'error' },
      { content: 'Notification 2' },
      { content: 'Notification 3', type: 'success', id: '10' }
    ]

    const next = [
      { content: 'Notification 4', type: 'error' },
      { content: 'Notification 5' },
      { content: 'Notification 6', type: 'success', id: '10' }
    ]

    const wrapper = shallow(
      <NotificationList
        items={items}
      />
    )

    expect(wrapper.find('Notification').at(0).props().children).toEqual('Notification 1')

    wrapper.setProps({ items: next })

    expect(wrapper.find('Notification').at(0).props().children).toEqual('Notification 4')
  })

  it('should close items automatically', () => {
    const items = [
      { content: 'Notification 1', type: 'error' },
      { content: 'Notification 2' },
      { content: 'Notification 3', type: 'success', id: '10' }
    ]

    const wrapper = mount(
      <NotificationList
        items={items}
        autoClose
      />
    )

    expect(wrapper.instance().getVisibleItems().length).toEqual(3)

    wrapper.find('Notification').at(0).props().onClose(items[0])

    expect(wrapper.instance().getVisibleItems().length).toEqual(2)
  })

  it('should not close items automatically without flag', () => {
    const items = [
      { content: 'Notification 1', type: 'error' },
      { content: 'Notification 2' },
      { content: 'Notification 3', type: 'success', id: '10' }
    ]

    const wrapper = mount(
      <NotificationList
        items={items}
      />
    )

    expect(wrapper.instance().getVisibleItems().length).toEqual(3)

    wrapper.find('Notification').at(0).props().onClose(items[0])

    expect(wrapper.instance().getVisibleItems().length).toEqual(3)
  })

  it('should change to not auto-closing behavior correctly', () => {
    const items = [
      { content: 'Notification 1', type: 'error' },
      { content: 'Notification 2' },
      { content: 'Notification 3', type: 'success', id: '10' }
    ]

    const wrapper = shallow(
      <NotificationList
        items={items}
        autoClose
      />
    )

    wrapper.find('Notification').at(0).props().onClose(items[0])

    expect(wrapper.instance().getVisibleItems().length).toEqual(2)

    wrapper.setProps({ autoClose: false })

    expect(wrapper.instance().getVisibleItems().length).toEqual(3)
  })

  it('should handle correctly notifications list stickiness', () => {
    const items = [
      { content: 'Notification 1', type: 'error' },
      { content: 'Notification 2' },
      { content: 'Notification 3', type: 'success', id: '10' }
    ]

    const wrapper = shallow(
      <NotificationList
        items={items}
        sticky
      />
    )

    expect(wrapper.hasClass(`${name}--sticky`)).toBe(true)
  })

  it('should handle correctly notifications list position', () => {
    const items = [
      { content: 'Notification 1', type: 'error' },
      { content: 'Notification 2' },
      { content: 'Notification 3', type: 'success', id: '10' }
    ]

    const wrapper = shallow(
      <NotificationList
        items={items}
        sticky
        horizontal='center'
        vertical='top'
      />
    )

    expect(wrapper.hasClass(`${name}--center`)).toBe(true)
    expect(wrapper.hasClass(`${name}--top`)).toBe(true)
  })
})
