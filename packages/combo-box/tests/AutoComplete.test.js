import React from 'react'
import { mount } from 'enzyme'

import { resetIdCounter } from 'downshift'

import { TextInput } from '@talixo/text-input'

import AutoComplete from '../src/AutoComplete'

const options = [
  'abc',
  'abcd',
  'abcde',
  'abb'
]

jest.mock('lodash/debounce', () => (fn, time) => {
  let timeout

  const debounced = (...args) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => fn(...args), time)
  }

  debounced.cancel = () => clearTimeout(timeout)
  return debounced
})

describe('<AutoComplete />', () => {
  beforeEach(() => resetIdCounter())

  it('should render correctly', () => {
    const wrapper = mount(
      <AutoComplete>
        <input type='email' />
      </AutoComplete>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should pass input down', () => {
    const wrapper = mount(
      <AutoComplete>
        <input type='email' />
      </AutoComplete>
    )

    expect(wrapper.find('input[type="email"]').length).toBe(1)

    wrapper.unmount()
  })

  it('should handle events on input', () => {
    const change = jest.fn()
    const focus = jest.fn()
    const blur = jest.fn()

    const wrapper = mount(
      <AutoComplete>
        <input
          type='email'
          onChange={change}
          onFocus={focus}
          onBlur={blur}
        />
      </AutoComplete>
    )

    const input = wrapper.find('input')

    input.simulate('change')
    expect(change.mock.calls.length).toBe(1)

    input.simulate('focus')
    expect(focus.mock.calls.length).toBe(1)

    input.simulate('blur')
    expect(blur.mock.calls.length).toBe(1)

    wrapper.unmount()
  })

  it('should handle events on autocomplete', () => {
    const focus = jest.fn()
    const blur = jest.fn()

    const wrapper = mount(
      <AutoComplete
        onFocus={focus}
        onBlur={blur}
      >
        <input type='email' />
      </AutoComplete>
    )

    const input = wrapper.find('input')

    input.simulate('focus')
    expect(focus.mock.calls.length).toBe(1)

    input.simulate('blur')
    expect(blur.mock.calls.length).toBe(1)

    wrapper.unmount()
  })

  it('should show menu when it is open', () => {
    const wrapper = mount(
      <AutoComplete isOpen options={[ 'abc', 'def' ]}>
        <input type='text' />
      </AutoComplete>
    )

    expect(wrapper.find('Menu').length).toBe(1)
    expect(wrapper.find('MenuItem').length).toBe(2)

    wrapper.unmount()
  })

  it('should fire `choose` event', () => {
    const choose = jest.fn()

    const wrapper = mount(
      <AutoComplete isOpen options={[ 'abc', 'def' ]} onChoose={choose}>
        <input type='text' />
      </AutoComplete>
    )

    wrapper.find('MenuItem').at(0).simulate('click')
    expect(choose.mock.calls.length).toBe(1)
    expect(choose.mock.calls[0]).toEqual([ 'abc' ])

    wrapper.unmount()
  })

  it('should set input value correctly', () => {
    const wrapper = mount(
      <AutoComplete isOpen options={[ 'abc', 'def' ]}>
        <input type='text' value='abcxxx' />
      </AutoComplete>
    )

    expect(wrapper.find('input').prop('value')).toBe('abcxxx')

    wrapper.unmount()
  })

  it('should work with inputs which emits event on change', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <AutoComplete isOpen options={[ 'abc', 'def' ]} onInputValueChange={spy}>
        <input type='text' />
      </AutoComplete>
    )

    const input = wrapper.find('input')
    const domInput = input.getDOMNode()

    domInput.value = 'abcxxx'

    input.simulate('change', { target: domInput })

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0][0]).toBe('abcxxx')

    wrapper.unmount()
  })

  it('should work with inputs which emits value on change', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <AutoComplete isOpen options={[ 'abc', 'def' ]} onInputValueChange={spy}>
        <TextInput type='text' />
      </AutoComplete>
    )

    const input = wrapper.find('TextInput')

    input.props().onChange('abcddd')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0][0]).toBe('abcddd')

    wrapper.unmount()
  })

  it('search with delay and invoke spyLoadRequest', () => {
    const spy = jest.fn()
    const spyLoadRequest = jest.fn(() => options)

    const testValue = 'abc'

    const wrapper = mount(
      <AutoComplete
        isOpen
        options={[ 'abcdef', 'abcee', 'defeee' ]}
        onInputValueChange={spy}
        onLoadRequest={spyLoadRequest}
      >
        <TextInput type='text' />
      </AutoComplete>
    )

    jest.useFakeTimers()

    const input = wrapper.find(TextInput)

    input.find('input').simulate('change', {target: {value: testValue}})

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spyLoadRequest).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  it('search with delay and invoke spyStopRequest', () => {
    const spy = jest.fn()
    const spyLoadRequest = jest.fn(() => options)
    const spyStopRequest = jest.fn(() => [])

    const testValue = 'abc'

    const wrapper = mount(
      <AutoComplete
        isOpen
        options={[ 'abcdef', 'abcee', 'defeee' ]}
        onInputValueChange={spy}
        onLoadRequest={spyLoadRequest}
        onStopRequest={spyStopRequest}
      >
        <TextInput type='text' />
      </AutoComplete>
    )

    jest.useFakeTimers()

    const input = wrapper.find(TextInput)

    input.find('input').simulate('change', { target: { value: testValue.slice(0, 2) } })

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spyStopRequest).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })
})
