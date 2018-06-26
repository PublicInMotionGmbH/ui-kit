import React from 'react'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import Modal from '../src/Modal'

const name = prefix('modal')

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
})
