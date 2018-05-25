import React from 'react'
import { mount } from 'enzyme'

import Downshift from 'downshift'

import { prefix } from '@talixo/shared'

import ComboBox from '../src/ComboBox'

const moduleName = prefix('combo-box')

describe('<ComboBox />', () => {
  beforeEach(() => Downshift.resetIdCounter())

  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('should render correctly', () => {
    const wrapper = mount(
      <ComboBox />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should render menu when select box is opened and has options', () => {
    const wrapper = mount(
      <ComboBox isOpen options={[ 'abc', 'def' ]} />
    )

    expect(wrapper).toMatchSnapshot()

    wrapper.unmount()
  })

  it('should not render menu when select box is opened and has no options', () => {
    const wrapper = mount(
      <ComboBox isOpen />
    )

    expect(wrapper).toMatchSnapshot()

    wrapper.unmount()
  })

  it('should show select box with selected value', () => {
    const wrapper = mount(
      <ComboBox
        value='abc'
      />
    )

    expect(wrapper).toMatchSnapshot()

    wrapper.unmount()
  })

  it('should show multi-select box with many values', () => {
    const wrapper = mount(
      <ComboBox
        multi
        value={[ 'abc', 'def' ]}
      />
    )

    expect(wrapper).toMatchSnapshot()

    wrapper.unmount()
  })

  it('should open select box after click', () => {
    const wrapper = mount(
      <ComboBox options={[ 'abc', 'def' ]} />
    )

    wrapper.find(`.${moduleName}__value`).simulate('click')

    jest.runAllTimers()
    wrapper.update()

    const box = wrapper.find(`.${moduleName}`)

    expect(box.hasClass(`${moduleName}--open`)).toBe(true)
  })

  it('should close select box after 2nd click', () => {
    const wrapper = mount(
      <ComboBox options={[ 'abc', 'def' ]} />
    )

    wrapper.find(`.${moduleName}__value`).simulate('click')

    jest.runAllTimers()
    wrapper.update()

    wrapper.find(`.${moduleName}__value`).simulate('click')

    jest.runAllTimers()
    wrapper.update()

    const box = wrapper.find(`.${moduleName}`)

    expect(box.hasClass(`${moduleName}--open`)).toBe(false)

    wrapper.unmount()
  })

  it('should close menu after selection', () => {
    const wrapper = mount(
      <ComboBox options={[ 'abc', 'def' ]} />
    )

    wrapper.find(`.${moduleName}__value`).simulate('click')

    jest.runAllTimers()
    wrapper.update()

    wrapper.find(`.${moduleName}__item`).at(0).simulate('click')

    jest.runAllTimers()
    wrapper.update()

    const box = wrapper.find(`.${moduleName}`)

    expect(box.hasClass(`${moduleName}--open`)).toBe(false)

    wrapper.unmount()
  })

  it('should keep menu after selection in multi-select', () => {
    const wrapper = mount(
      <ComboBox multi options={[ 'abc', 'def' ]} />
    )

    wrapper.find(`.${moduleName}__value`).simulate('click')

    jest.runAllTimers()
    wrapper.update()

    wrapper.find(`.${moduleName}__item`).at(0).simulate('click')

    jest.runAllTimers()
    wrapper.update()

    const box = wrapper.find(`.${moduleName}`)

    expect(box.hasClass(`${moduleName}--open`)).toBe(true)

    wrapper.unmount()
  })

  it('should allow self-control', () => {
    const wrapper = mount(
      <ComboBox />
    )

    const input = wrapper.find('input')

    input.simulate('change', { target: { value: 'bbb' } })

    expect(wrapper.find('input').prop('value')).toBe('bbb')

    wrapper.unmount()
  })

  it('should allow outside control', () => {
    const wrapper = mount(
      <ComboBox inputValue='abc' />
    )

    const input = wrapper.find('input')

    input.simulate('change', { target: { value: 'bbb' } })

    expect(wrapper.find('input').prop('value')).toBe('abc')

    wrapper.unmount()
  })

  it('should allow changing from self-control to outside control', () => {
    const wrapper = mount(
      <ComboBox />
    )

    wrapper.find('input').simulate('change', { target: { value: 'bbb' } })

    expect(wrapper.find('input').prop('value')).toBe('bbb')

    wrapper.setProps({ inputValue: 'abc' })

    wrapper.find('input').simulate('change', { target: { value: 'bbb' } })

    expect(wrapper.find('input').prop('value')).toBe('abc')

    wrapper.unmount()
  })

  it('should allow changing from outside control to self-control', () => {
    const wrapper = mount(
      <ComboBox inputValue='abc' />
    )

    wrapper.setProps({ inputValue: null })

    expect(wrapper.find('input').prop('value')).toBe('abc')

    wrapper.find('input').simulate('change', { target: { value: 'bbb' } })

    expect(wrapper.find('input').prop('value')).toBe('bbb')

    wrapper.unmount()
  })

  it('should work with onChange event for single selection', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ComboBox
        isOpen
        options={[ 'abc', 'def' ]}
        onChange={spy}
      />
    )

    wrapper.find(`.${moduleName}__item`).at(0).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 'abc' ])

    wrapper.unmount()
  })

  it('should work with onChange event for multi selection with 1 element', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ComboBox
        multi
        isOpen
        options={[ 'abc', 'def' ]}
        onChange={spy}
      />
    )

    wrapper.find(`.${moduleName}__item`).at(0).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ [ 'abc' ] ])

    wrapper.unmount()
  })

  it('should work with onChange event for multi selection with 2 elements', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ComboBox
        multi
        isOpen
        options={[ 'abc', 'def' ]}
        onChange={spy}
      />
    )

    wrapper.find(`.${moduleName}__item`).at(0).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ [ 'abc' ] ])

    wrapper.setProps({ value: [ 'abc' ] })

    wrapper.find(`.${moduleName}__item`).at(1).simulate('click')

    expect(spy.mock.calls.length).toBe(2)
    expect(spy.mock.calls[1]).toEqual([ [ 'abc', 'def' ] ])

    wrapper.unmount()
  })

  it('should unselect current element in multi', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ComboBox
        multi
        isOpen value={[ 'abc' ]}
        options={[ 'abc', 'def' ]}
        onChange={spy}
      />
    )

    wrapper.find(`.${moduleName}__item`).at(0).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ [] ])

    wrapper.unmount()
  })

  it('should remove current selection on `remove` button', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ComboBox
        multi
        value='abc'
        options={[ 'abc', 'def' ]}
        onChange={spy}
      />
    )

    wrapper.find(`.${moduleName}__remove`).at(0).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ [] ])

    wrapper.unmount()
  })

  it('should allow clearing current value', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ComboBox
        value='abc'
        options={[ 'abc', 'def' ]}
        onChange={spy}
      />
    )

    wrapper.find(`.${moduleName}__clear`).at(0).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ null ])

    wrapper.unmount()
  })

  it('should handle events on combo-box', () => {
    const focus = jest.fn()
    const blur = jest.fn()

    const wrapper = mount(
      <ComboBox
        onFocus={focus}
        onBlur={blur}
      >
        <input type='email' />
      </ComboBox>
    )

    const input = wrapper.find('input')

    input.simulate('focus')
    expect(focus.mock.calls.length).toBe(1)

    input.simulate('blur')
    expect(blur.mock.calls.length).toBe(1)

    wrapper.unmount()
  })

  it('should add new value in multi-select after Tab key', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <ComboBox
        multi
        inputValue='abcdef'
        onNewValue={spy}
      />
    )

    // Click Tab key
    wrapper.find('input').simulate('keydown', { which: 9 })

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 'abcdef' ])

    wrapper.unmount()
  })

  it('should add new value in multi-select after Comma key', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <ComboBox
        multi
        inputValue='abcdef'
        onNewValue={spy}
      />
    )

    // Click Tab key
    wrapper.find('input').simulate('keydown', { which: 188 })

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 'abcdef' ])

    wrapper.unmount()
  })

  it('should not remove value in multi-select after Backspace key when there is text', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <ComboBox
        multi
        value={[ 'xyz' ]}
        inputValue='abcdef'
        onChange={spy}
      />
    )

    // Click Tab key
    wrapper.find('input').simulate('keydown', { which: 8 })

    expect(spy.mock.calls.length).toBe(0)

    wrapper.unmount()
  })

  it('should remove value in multi-select after Backspace key when input is empty', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <ComboBox
        multi
        value={[ 'xyz', 'abc' ]}
        inputValue=''
        onChange={spy}
      />
    )

    // Click Tab key
    wrapper.find('input').simulate('keydown', { which: 8 })

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ [ 'xyz' ] ])

    wrapper.unmount()
  })
})
