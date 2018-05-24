import React from 'react'
import { mount, shallow } from 'enzyme'

import CreditCardNumberInput from '../src/CreditCardNumberInput'

describe('<CreditCardNumberInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<CreditCardNumberInput />)

    expect(wrapper).toMatchSnapshot()
  })

  it('passes value correctly', () => {
    const value = '12345678910'
    const wrapper = shallow(<CreditCardNumberInput value={value} />)
    const input = wrapper.find('TextInput')

    expect(input.props().value).toEqual(value)
  })

  it('masks correctly', () => {
    const value = '12345678910111213'
    const wrapper = mount(<CreditCardNumberInput value={value} />)
    const input = wrapper.find('input').getDOMNode()
    expect(input.value).toEqual('12345678910111213')
    wrapper.unmount()
  })

  describe('componentWillReceiveProps', () => {
    it('updates current value', () => {
      const wrapper = shallow(<CreditCardNumberInput />)
      wrapper.setProps({ value: '10000' })

      expect(wrapper.state().value).toEqual('10000')
    })

    it('updates current value when value is provided', () => {
      const value = '12345678910'
      const wrapper = shallow(<CreditCardNumberInput value={value} />)
      wrapper.setProps({ value: '10000' })

      expect(wrapper.state().value).toEqual('10000')
    })
  })
})

describe('change', () => {
  let onChange, wrapper, input
  beforeEach(() => {
    onChange = jest.fn()
    wrapper = shallow(<CreditCardNumberInput onChange={onChange} />)

    input = wrapper.find('TextInput')
    input.simulate('change', '2')
  })

  it('onChange is called when input value changes', () => {
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('changes state.value to passed value if props.value is null', () => {
    expect(wrapper.state().value).toEqual('2')
  })
})

describe('focus', () => {
  let onFocus, wrapper, input
  beforeEach(() => {
    onFocus = jest.fn()
    wrapper = shallow(<CreditCardNumberInput onFocus={onFocus} />)

    input = wrapper.find('TextInput')
    input.simulate('focus')
  })

  it('onFocus is called when input value changes', () => {
    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  it('changes state.focused to true', () => {
    expect(wrapper.state().focused).toEqual(false)
    setTimeout(() => expect(wrapper.state().focused).toEqual(true))
  })
})

describe('blur', () => {
  let onBlur, wrapper, input
  beforeEach(() => {
    onBlur = jest.fn()
    wrapper = shallow(<CreditCardNumberInput onBlur={onBlur} />)

    input = wrapper.find('TextInput')
    input.simulate('blur')
  })

  it('onBlur is called when input value changes', () => {
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('changes state.focused to false', () => {
    expect(wrapper.state().focused).toEqual(false)
  })
})

describe('trim', () => {
  it('it trims correctly', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<CreditCardNumberInput onChange={onChange} />)

    const input = wrapper.find('TextInput')
    input.simulate('change', '   1234')
    expect(wrapper.state().value).toEqual('1234')
  })
})
