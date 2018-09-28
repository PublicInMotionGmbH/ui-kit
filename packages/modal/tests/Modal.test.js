import React from 'react'
import { shallow, mount } from 'enzyme'

import { prefix } from '@talixo/shared'

import Modal, { moduleName } from '../src/Modal'

const name = prefix(moduleName)
const backdropName = `.${name}-backdrop`

describe('<Modal />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Modal>
        <h2>Modal</h2>
      </Modal>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should style modal as informational', () => {
    const wrapper = shallow(
      <Modal informational>
        <h2>Modal</h2>
      </Modal>
    )

    expect(wrapper.find(`.${name}`).hasClass(`${name}--informational`)).toBe(true)
  })

  it('should not style modal as informational by default', () => {
    const wrapper = shallow(
      <Modal>
        <h2>Modal</h2>
      </Modal>
    )

    expect(wrapper.find(`.${name}`).hasClass(`${name}--informational`)).toBe(false)
  })

  it('should handle different types of informational modal', () => {
    const wrapper = shallow(
      <Modal informational type='success'>
        <h2>Modal</h2>
      </Modal>
    )

    expect(wrapper.find(`.${name}`).hasClass(`${name}--informational`)).toBe(true)
    expect(wrapper.find(`.${name}`).hasClass(`${name}--success`)).toBe(true)

    wrapper.setProps({ type: 'error' })

    expect(wrapper.find(`.${name}`).hasClass(`${name}--error`)).toBe(true)
  })

  it('should show icon in informational modal', () => {
    const wrapper = shallow(
      <Modal informational icon={<span id='test' />}>
        <h2>Modal</h2>
      </Modal>
    )

    expect(wrapper.find('#test').length).toBe(1)
  })

  it('should not show icon in not informational modal', () => {
    const wrapper = shallow(
      <Modal icon={<span id='test' />}>
        <h2>Modal</h2>
      </Modal>
    )

    expect(wrapper.find('#test').length).toBe(0)
  })

  it('should invoke onOverlayClick when backdrop is clicked', () => {
    const click = jest.fn()
    const wrapper = shallow(
      <Modal onOverlayClick={click} icon={<span id='test' />}>
        <h2>Modal</h2>
      </Modal>
    )
    const backdrop = wrapper.find(backdropName)
    backdrop.simulate('click', { target: backdrop, currentTarget: backdrop })
    expect(click).toHaveBeenCalledTimes(1)
  })

  it('should not invoke onOverlayClick when something else than backdrop is clicked', () => {
    const click = jest.fn()
    const wrapper = shallow(
      <Modal onOverlayClick={click} icon={<span id='test' />}>
        <h2>Modal</h2>
      </Modal>
    )
    const backdrop = wrapper.find(backdropName)
    const h2 = wrapper.find('h2')

    backdrop.simulate('click', { target: backdrop, currentTarget: h2 })
    expect(click).toHaveBeenCalledTimes(0)
  })

  it('should invoke onEscKeyPress when modal is open and esc is pressed', () => {
    const onEscKeyDown = jest.fn()
    const wrapper = mount(
      <Modal onEscKeyDown={onEscKeyDown} open>
        <h2>Modal</h2>
      </Modal>
    )
    const event = new window.Event('keydown')
    event.keyCode = 27
    document.dispatchEvent(event)
    expect(onEscKeyDown).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('should not invoke onEscKeyPress when modal is open and sth different then escape is pressed', () => {
    const onEscKeyDown = jest.fn()
    const wrapper = mount(
      <Modal onEscKeyDown={onEscKeyDown} open>
        <h2>Modal</h2>
      </Modal>
    )
    const event = new window.Event('keydown')
    event.keyCode = 22
    document.dispatchEvent(event)
    expect(onEscKeyDown).toHaveBeenCalledTimes(0)
    wrapper.unmount()
  })

  it('should not invoke onEscKeyPress when modal is open and sth different then escape is pressed', () => {
    const onEscKeyDown = jest.fn()
    const wrapper = mount(
      <Modal onEscKeyDown={onEscKeyDown} open>
        <h2>Modal</h2>
      </Modal>
    )
    const event = new window.Event('keydown')
    event.keyCode = 22
    document.dispatchEvent(event)
    expect(onEscKeyDown).toHaveBeenCalledTimes(0)
    wrapper.unmount()
  })

  it('should not invoke onEscKeyPress when modal is open and sth different then escape is pressed', () => {
    const onEscKeyDown = jest.fn()
    const wrapper = mount(
      <Modal onEscKeyDown={onEscKeyDown} open>
        <h2>Modal</h2>
      </Modal>
    )
    const event = new window.Event('keydown')
    event.keyCode = 22
    document.dispatchEvent(event)
    expect(onEscKeyDown).toHaveBeenCalledTimes(0)
    wrapper.unmount()
  })

  it('should add event listener when onEscDown prop is added', () => {
    const onEscKeyDown = () => {}
    const wrapper = mount(
      <Modal open>
        <h2>Modal</h2>
      </Modal>
    )
    expect(wrapper.instance().escEventAdded).toBeFalsy()
    wrapper.setProps({ onEscKeyDown })
    expect(wrapper.instance().escEventAdded).toBe(true)
    wrapper.unmount()
  })

  it('should remove event listener when onEscDown prop is removed', () => {
    const onEscKeyDown = () => {}
    const wrapper = mount(
      <Modal onEscKeyDown={onEscKeyDown} open>
        <h2>Modal</h2>
      </Modal>
    )
    expect(wrapper.instance().escEventAdded).toBe(true)
    wrapper.setProps({ onEscKeyDown: undefined })
    expect(wrapper.instance().escEventAdded).toBeFalsy()
    wrapper.unmount()
  })
})
