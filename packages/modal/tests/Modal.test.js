import React from 'react'
import { shallow } from 'enzyme'

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

  it('should invoke onClick when backdrop is clicked', () => {
    const click = jest.fn()
    const wrapper = shallow(
      <Modal onClick={click} icon={<span id='test' />}>
        <h2>Modal</h2>
      </Modal>
    )
    const backdrop = wrapper.find(backdropName)
    backdrop.simulate('click', { target: backdrop, currentTarget: backdrop })
    expect(click).toHaveBeenCalledTimes(1)
  })

  it('should invoke onClick when backdrop is clicked', () => {
    const click = jest.fn()
    const wrapper = shallow(
      <Modal onClick={click} icon={<span id='test' />}>
        <h2>Modal</h2>
      </Modal>
    )
    const backdrop = wrapper.find(backdropName)
    const h2 = wrapper.find('h2')

    backdrop.simulate('click', { target: backdrop, currentTarget: h2 })
    expect(click).toHaveBeenCalledTimes(0)
  })
})
