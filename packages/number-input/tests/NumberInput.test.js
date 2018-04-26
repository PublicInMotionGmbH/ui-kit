import React from 'react'
import { shallow, mount } from 'enzyme'

import NumberInput from '../src/NumberInput'
import NumberInputStepper from '../src/NumberInputStepper'

import { prefix } from '@talixo/shared'

const name = prefix('number-input')

describe('<NumberInput />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<NumberInput />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should render stepper', () => {
    const wrapper = mount(<NumberInput />)

    expect(wrapper.find(NumberInputStepper).length).toBe(1)

    wrapper.unmount()
  })

  it('should pass class name to TextInput', () => {
    const wrapper = shallow(<NumberInput className='abc' />)

    // It adds new class name
    expect(wrapper.hasClass('abc')).toBe(true)

    // It still does have basic one
    expect(wrapper.hasClass(name)).toBe(true)
  })

  it('should handle `size`', () => {
    const wrapper = shallow(<NumberInput size='small' />)

    // It adds new class name
    expect(wrapper.hasClass(`${name}--small`)).toBe(true)
  })

  it('should pass styles', () => {
    const wrapper = shallow(<NumberInput style={{ color: 'red' }} />)

    expect(wrapper.prop('style')).toEqual({
      color: 'red'
    })
  })

  it('should pass TextInput props', () => {
    const wrapper = shallow(<NumberInput aria-hidden />)

    expect(wrapper.find('TextInput').prop('aria-hidden')).toBe(true)
  })

  it('should handle `value` correctly', () => {
    const wrapper = shallow(<NumberInput value={333} />)

    expect(wrapper.find('TextInput').prop('value')).toBe(333)
  })

  it('should work with `min` value', () => {
    const spy = jest.fn()

    const wrapper = mount(<NumberInput min={10} onChange={spy} />)

    wrapper.find('input').simulate('change', {
      target: { value: -10 }
    })

    // It should round to natural number
    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 10 ])

    wrapper.unmount()
  })

  it('should work with `max` value', () => {
    const spy = jest.fn()

    const wrapper = mount(<NumberInput max={10} onChange={spy} />)

    wrapper.find('input').simulate('change', {
      target: { value: 10 }
    })

    // It should round to natural number
    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 10 ])

    wrapper.unmount()
  })

  it('should trigger onChange event', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <NumberInput
        max={10}
        onChange={spy}
      />
    )

    wrapper.find('input').simulate('change', {
      target: { value: 10 }
    })

    // It should round to natural number
    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 10 ])
  })

  it('should not trigger onChange event when there is no change', () => {
    const spy = jest.fn()

    const wrapper = mount(<NumberInput value={10} onChange={spy} />)

    wrapper.find('input').simulate('change', {
      target: { value: 10 }
    })

    expect(spy.mock.calls.length).toBe(0)
  })

  it('should use precision correctly', () => {
    const spy = jest.fn()

    const wrapper = mount(<NumberInput value={333} onChange={spy} />)

    wrapper.find('input').simulate('change', {
      target: { value: 334.33333 }
    })

    // It should round to natural number
    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 334 ])
    spy.mockReset()

    wrapper.setProps({ precision: 2 })

    // It should cut to selected precision
    wrapper.find('input').simulate('change', {
      target: { value: 333.33333 }
    })

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 333.33 ])
    spy.mockReset()

    // It should ceil value up now
    wrapper.find('input').simulate('change', {
      target: { value: 999.99999 }
    })

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 1000 ])

    wrapper.unmount()
  })

  it('should ignore text put inside', () => {
    const spy = jest.fn()

    const wrapper = mount(<NumberInput value={333} onChange={spy} />)

    wrapper.find('input').simulate('change', {
      target: { value: 'abc' }
    })

    // It should round to natural number
    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ NaN ])
  })

  it('should pass `initialTime` to stepper', () => {
    const wrapper = mount(<NumberInput initialTime={3000} />)

    expect(wrapper.find(NumberInputStepper).prop('initialTime')).toBe(3000)
  })

  it('should pass `stepTime` to stepper', () => {
    const wrapper = mount(<NumberInput stepTime={3000} />)

    expect(wrapper.find(NumberInputStepper).prop('stepTime')).toBe(3000)
  })

  it('should increment value', () => {
    const spy = jest.fn()

    const wrapper = mount(<NumberInput value={10} onChange={spy} />)

    wrapper.find(NumberInputStepper).prop('onIncrement')()

    // It should round to natural number
    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 11 ])

    wrapper.unmount()
  })

  it('should decrement value', () => {
    const spy = jest.fn()

    const wrapper = mount(<NumberInput value={10} onChange={spy} />)

    wrapper.find(NumberInputStepper).prop('onDecrement')()

    // It should round to natural number
    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 9 ])

    wrapper.unmount()
  })
})
