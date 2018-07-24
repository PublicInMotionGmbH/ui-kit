import React from 'react'
import { shallow } from 'enzyme'

import CvcInput from '../src/CvcInput'

function createKeyEvent (keyCode, fn) {
  return {
    keyCode: keyCode,
    preventDefault: fn
  }
}

describe('<CvcInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<CvcInput />)

    expect(wrapper).toMatchSnapshot()
  })

  it('passes value correctly', () => {
    const value = '12345678910'
    const wrapper = shallow(<CvcInput value={value} />)
    const input = wrapper.find('TextInput')

    expect(input.props().value).toEqual(value)
  })

  describe('componentWillReceiveProps', () => {
    it('updates current value', () => {
      const wrapper = shallow(<CvcInput />)
      wrapper.setProps({ value: '10000' })

      expect(wrapper.state().value).toEqual('10000')
    })

    it('updates current value when value is provided', () => {
      const value = '12345678910'
      const wrapper = shallow(<CvcInput value={value} />)
      wrapper.setProps({ value: '10000' })

      expect(wrapper.state().value).toEqual('10000')
    })
  })
})

describe('change', () => {
  let onChange, wrapper, input
  beforeEach(() => {
    onChange = jest.fn()
    wrapper = shallow(<CvcInput onChange={onChange} />)

    input = wrapper.find('TextInput')
    input.simulate('change', '2')
  })

  it('onChange is called when input value changes', () => {
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('returns when value is the same as in state', () => {
    input.simulate('change', '2')

    expect(wrapper.state().value).toEqual('2')
  })

  it('changes state.value to passed value if props.value is null', () => {
    expect(wrapper.state().value).toEqual('2')
  })
})

describe('focus', () => {
  it('onFocus is called when input value changes', () => {
    const onFocus = jest.fn()
    const wrapper = shallow(<CvcInput onFocus={onFocus} />)

    const input = wrapper.find('TextInput')
    input.simulate('focus')

    expect(onFocus).toHaveBeenCalledTimes(1)
  })
})

describe('blur', () => {
  it('onBlur is called when input value changes', () => {
    const onBlur = jest.fn()
    const wrapper = shallow(<CvcInput onBlur={onBlur} />)

    const input = wrapper.find('TextInput')
    input.simulate('blur')

    expect(onBlur).toHaveBeenCalledTimes(1)
  })
})

describe('onKeyDown', () => {
  const event = {
    preventDefault: () => {}
  }
  let wrapper, textInput

  beforeEach(() => {
    jest.spyOn(event, 'preventDefault')
    wrapper = shallow(<CvcInput />)
    textInput = wrapper.find('TextInput')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('doesn`t prevent default on digit and arrow keys', () => {
    textInput.simulate('keydown', createKeyEvent(38, event.preventDefault))
    expect(event.preventDefault).toHaveBeenCalledTimes(0)
    textInput.simulate('keydown', createKeyEvent(49, event.preventDefault))
    expect(event.preventDefault).toHaveBeenCalledTimes(0)
  })

  it('prevents default on the rest', () => {
    textInput.simulate('keydown', createKeyEvent(32, event.preventDefault))
    expect(event.preventDefault).toHaveBeenCalledTimes(1)

    jest.resetAllMocks()

    textInput.simulate('keydown', createKeyEvent(58, event.preventDefault))
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
  })
})
