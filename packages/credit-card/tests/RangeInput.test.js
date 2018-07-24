import React from 'react'
import { mount, shallow } from 'enzyme'

import { detector } from '@talixo/device-swap'

import RangeInput from '../src/RangeInput'

function createKeyEvent (keyCode, fn) {
  return {
    keyCode: keyCode,
    preventDefault: fn
  }
}

describe('<RangeInput />', () => {
  beforeEach(() => detector.setViewType('desktop'))
  afterEach(() => detector.reset())

  it('renders correctly', () => {
    const wrapper = shallow(<RangeInput />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders correctly mounted', () => {
    const wrapper = mount(<RangeInput />)

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('updates state.value when value is provided', () => {
    const value = 3
    const wrapper = shallow(<RangeInput />)
    wrapper.setProps({ value })
    expect(wrapper.state().value).toEqual(value)
  })
})

describe('formatValue', () => {
  it('formats value correctly if minLength is provided', () => {
    const value = 1
    const minLength = 3

    const wrapper = shallow(<RangeInput value={value} minLength={minLength} />)
    expect(wrapper.state().inputValue).toEqual('001')
  })

  it('formats value correctly if NaN is provided', () => {
    const value = NaN

    const wrapper = shallow(<RangeInput value={value} />)
    expect(wrapper.state().inputValue).toEqual('')
  })
})

describe('componentWillReceiveProps', () => {
  let value, minLength, wrapper
  beforeEach(() => {
    value = 1
    minLength = 3

    wrapper = shallow(<RangeInput value={value} minLength={minLength} />)
    wrapper.state.focus = false
  })

  it('sets inputValue correctly if value is passed', () => {
    wrapper.setProps({ value: 2 })
    expect(wrapper.state().inputValue).toEqual('002')
  })

  it('sets inputValue correctly if minLength is passed', () => {
    wrapper.setProps({ minLength: 2 })
    expect(wrapper.state().inputValue).toEqual('01')
  })
})

describe('buildEndValue', () => {
  it('builds end value correctly', () => {
    const wrapper = shallow(<RangeInput />)
    const autoComplete = wrapper.find('AutoComplete')
    autoComplete.simulate('change', '1')
    expect(wrapper.state().value).toEqual(1)
  })

  it('returns null if value is greater than max', () => {
    const min = 1
    const max = 12

    const wrapper = shallow(<RangeInput min={min} max={max} />)
    const autoComplete = wrapper.find('AutoComplete')
    autoComplete.simulate('change', '14')
    expect(wrapper.state().value).toEqual(null)
  })

  it('returns null if value is smaller than min', () => {
    const min = 7
    const max = 12

    const wrapper = shallow(<RangeInput min={min} max={max} />)
    const autoComplete = wrapper.find('AutoComplete')
    autoComplete.simulate('change', '1')
    expect(wrapper.state().value).toEqual(null)
  })

  it('returns null if value is NaN', () => {
    const wrapper = shallow(<RangeInput />)
    const autoComplete = wrapper.find('AutoComplete')
    autoComplete.simulate('change', 'string')
    expect(wrapper.state().value).toEqual(null)
  })

  it('returns null if value is false', () => {
    const wrapper = shallow(<RangeInput />)
    const autoComplete = wrapper.find('AutoComplete')
    autoComplete.simulate('change', false)
    expect(wrapper.state().value).toEqual(null)
  })

  it('updates state.inputValue on input value change', () => {
    const inputValue = '15'
    const wrapper = shallow(<RangeInput />)
    const autoComplete = wrapper.find('AutoComplete')
    autoComplete.simulate('change', inputValue)
    expect(wrapper.state().inputValue).toEqual('15')
  })
})

describe('range', () => {
  it('formats state.options correctly', () => {
    const min = 1
    const max = 10
    const range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const wrapper = shallow(<RangeInput min={min} max={max} />)

    expect(wrapper.state().options).toEqual(range)
  })

  it('formats state.options correctly if min is provided', () => {
    const min = 1
    const max = 10
    const range = [5, 6, 7, 8, 9, 10]

    const wrapper = shallow(<RangeInput min={min} max={max} />)
    wrapper.setProps({ min: 5 })

    expect(wrapper.state().options).toEqual(range)
  })

  it('formats state.options correctly if max is provided', () => {
    const min = 1
    const max = 10
    const range = [1, 2, 3, 4, 5]

    const wrapper = shallow(<RangeInput min={min} max={max} />)
    wrapper.setProps({ max: 5 })

    expect(wrapper.state().options).toEqual(range)
  })
})

describe('change', () => {
  it('calls onChange', () => {
    const change = jest.fn()
    const wrapper = shallow(<RangeInput onChange={change} />)
    const autoComplete = wrapper.find('AutoComplete')
    autoComplete.simulate('change')

    expect(change).toHaveBeenCalledTimes(1)
  })
})

describe('focus', () => {
  it('updates state.focus', () => {
    const wrapper = shallow(<RangeInput />)
    const autoComplete = wrapper.find('AutoComplete')
    autoComplete.simulate('focus')

    expect(wrapper.state().focus).toEqual(true)
  })

  it('calls onFocus', () => {
    const focus = jest.fn()
    const wrapper = shallow(<RangeInput onFocus={focus} />)
    const autoComplete = wrapper.find('AutoComplete')
    autoComplete.simulate('focus')

    expect(focus).toHaveBeenCalledTimes(1)
  })
})

describe('blur', () => {
  it('updates state.focus', () => {
    const wrapper = shallow(<RangeInput />)
    const autoComplete = wrapper.find('AutoComplete')
    autoComplete.simulate('focus')
    autoComplete.simulate('blur')

    expect(wrapper.state().focus).toEqual(false)
  })

  it('calls onBlur', () => {
    const blur = jest.fn()
    const wrapper = shallow(<RangeInput onBlur={blur} />)
    const autoComplete = wrapper.find('AutoComplete')
    autoComplete.simulate('blur')

    expect(blur).toHaveBeenCalledTimes(1)
  })

  it('formats inputValue', () => {
    const wrapper = shallow(<RangeInput minLength={3} />)
    const autoComplete = wrapper.find('AutoComplete')
    autoComplete.simulate('change', 12)
    autoComplete.simulate('blur')

    expect(wrapper.state().inputValue).toEqual('012')
  })

  it('calls onChange', () => {
    const change = jest.fn()
    const wrapper = shallow(<RangeInput onChange={change} />)
    const autoComplete = wrapper.find('AutoComplete')
    autoComplete.simulate('blur')

    expect(change).toHaveBeenCalledTimes(1)
  })

  it('doesn`t call onChange if value is the same as in props', () => {
    const change = jest.fn()
    const value = 12
    const wrapper = shallow(<RangeInput onChange={change} value={value} />)
    const autoComplete = wrapper.find('AutoComplete')

    autoComplete.simulate('change', '12')
    jest.resetAllMocks()
    autoComplete.simulate('blur')

    expect(change).toHaveBeenCalledTimes(0)
  })

  it('autocompletes value correctly', () => {
    const autoCompleteLength = 2
    const min = 2000
    const max = 2020

    const wrapper = shallow(<RangeInput
      autoCompleteLength={autoCompleteLength}
      min={min}
      max={max}
    />)
    const autoComplete = wrapper.find('AutoComplete')
    wrapper.setState({ inputValue: '12' })
    autoComplete.simulate('blur')

    expect(wrapper.state().value).toEqual(2012)
  })
})

describe('onKeyDown', () => {
  const event = {
    preventDefault: () => {}
  }
  let wrapper, textInput

  beforeEach(() => {
    jest.spyOn(event, 'preventDefault')
    wrapper = shallow(<RangeInput />)
    console.log(wrapper.children())
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

describe('onInputValueChange', () => {
  it('sets value as state.inputValue', () => {
    const wrapper = shallow(<RangeInput />)
    const autoComplete = wrapper.find('AutoComplete')

    autoComplete.props().onInputValueChange('12')
    expect(wrapper.state().inputValue).toEqual('12')
  })

  it('returns is value is the same as in state.inputValue', () => {
    const wrapper = shallow(<RangeInput value={12} />)
    const autoComplete = wrapper.find('AutoComplete')

    autoComplete.props().onInputValueChange('12')
    expect(wrapper.state().inputValue).toEqual('12')
  })
})
