import React from 'react'
import { shallow, mount } from 'enzyme'

import SidebarElement from '../src/SidebarElement'
import SidebarPanel from '../src/SidebarPanel'

describe('<SidebarElement />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <SidebarElement
        icon='home'
        label='See more'
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should handle simple click on button', () => {
    const click = jest.fn()

    const wrapper = shallow(
      <SidebarElement
        icon='home'
        label='See more'
        onClick={click}
      />
    )

    wrapper.find('.talixo-sidebar-element__button').simulate('click')

    expect(click.mock.calls.length).toBe(1)
  })

  it('should render properly with panel inside', () => {
    const wrapper = shallow(
      <SidebarElement icon='home' label='See more'>
        <SidebarPanel>content</SidebarPanel>
      </SidebarElement>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should open with panel inside', () => {
    const click = jest.fn()

    const wrapper = mount(
      <SidebarElement icon='home' label='See more' onClick={click}>
        <SidebarPanel>content</SidebarPanel>
      </SidebarElement>
    )

    wrapper.find('.talixo-sidebar-element__button').simulate('click')

    expect(click.mock.calls.length).toBe(1)
    expect(wrapper.instance().state.open).toBe(true)

    wrapper.unmount()
  })

  it('should open and close on double click', () => {
    const click = jest.fn()

    const wrapper = mount(
      <SidebarElement icon='home' label='See more' onClick={click}>
        <SidebarPanel>content</SidebarPanel>
      </SidebarElement>
    )

    wrapper.find('.talixo-sidebar-element__button')
      .simulate('click')
      .simulate('click')

    expect(click.mock.calls.length).toBe(2)
    expect(wrapper.instance().state.open).toBe(false)

    wrapper.unmount()
  })

  it('should not close on click anywhere inside element', () => {
    const wrapper = mount(
      <SidebarElement icon='home' label='See more'>
        <SidebarPanel>content</SidebarPanel>
      </SidebarElement>
    )

    wrapper.find('.talixo-sidebar-element__button').simulate('click')

    wrapper.simulate('click')

    expect(wrapper.instance().state.open).toBe(true)

    wrapper.unmount()
  })

  it('should close on click anywhere outside element', () => {
    const wrapper = mount(
      <SidebarElement icon='home' label='See more'>
        <SidebarPanel>content</SidebarPanel>
      </SidebarElement>
    )

    document.documentElement.dispatchEvent(new window.Event('click'))

    expect(wrapper.instance().state.open).toBe(false)

    wrapper.unmount()
  })

  it('should not close when handleClose is fired within element', () => {
    const wrapper = mount(
      <SidebarElement icon='home' label='See more'>
        <SidebarPanel>content</SidebarPanel>
      </SidebarElement>
    )

    wrapper.find('.talixo-sidebar-element__button').simulate('click')

    const instance = wrapper.instance()
    instance.handleClose({ target: instance.node })

    expect(wrapper.instance().state.open).toBe(true)

    wrapper.unmount()
  })

  it('should close when handleClose is fired outside element', () => {
    const wrapper = mount(
      <SidebarElement icon='home' label='See more'>
        <SidebarPanel>content</SidebarPanel>
      </SidebarElement>
    )

    wrapper.find('.talixo-sidebar-element__button').simulate('click')

    const instance = wrapper.instance()
    instance.handleClose({ target: document.body })

    expect(wrapper.instance().state.open).toBe(false)

    wrapper.unmount()
  })
})
