import React from 'react'
import { mount, shallow } from 'enzyme'

import InlineInput, { moduleName } from '../src/InlineInput'

const createWrapper = props => shallow(<InlineInput {...props} />)

describe('module name', () => {
  it('exports correctly', () => {
    expect(moduleName).toEqual('inline-input')
  })
})

describe('focusInput', () => {
  it('should focus', () => {
    const mock = { focus: jest.fn() }
    const wrapper = createWrapper({ placeholder: '' })
    wrapper.instance().focusInput(mock)
    expect(mock.focus).toHaveBeenCalled()
  })
})

describe('<InlineInput />', () => {
  let span, wrapper
  beforeEach(() => {
    wrapper = createWrapper({ placeholder: '' })
    span = wrapper.find('span')
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('passes className to wrapper', () => {
    const className = 'new-class-name'
    const wrapperWithProps = createWrapper({ className: className, placeholder: '' })
    expect(wrapperWithProps.props().className.includes(className)).toEqual(true)
  })

  it('renders disabled correctly', () => {
    const wrapperWithProps = createWrapper({ disabled: true, placeholder: '' })
    expect(wrapperWithProps.props().className.includes('disabled')).toEqual(true)
  })

  it('should not change to input when disabled is set to true', () => {
    const wrapper = createWrapper({ disabled: true, placeholder: '' })
    span.simulate('click')
    expect(wrapper.find('span').exists()).toEqual(true)
    expect(wrapper.find('TextInput').exists()).toEqual(false)
  })

  it('should change state.editing to true when span is clicked', () => {
    span.simulate('click')
    expect(wrapper.state().editing).toEqual(true)
  })

  it('should change span to input when span is clicked', () => {
    span.simulate('click')
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('span').exists()).toEqual(false)
    expect(wrapper.find('TextInput').exists()).toEqual(true)
  })

  it('should change state.selected to false if no text is selected', () => {
    span.simulate('click')
    expect(wrapper.state().selected).toEqual(false)
  })

  it('should change state.selection to default if no text is selected', () => {
    span.simulate('click')
    expect(wrapper.state().selection).toEqual({ end: null, start: null })
  })

  it('should change state.selected to true if text is selected', () => {
    window.getSelection = jest.fn(() => {
      return {
        anchorOffset: 0,
        focusOffset: 0
      }
    })
    span.simulate('click')
    expect(wrapper.state().selected).toEqual(true)
  })

  it('should change state.selection if text is selected', () => {
    window.getSelection = jest.fn(() => {
      return {
        anchorOffset: 0,
        focusOffset: 0
      }
    })
    span.simulate('click')
    expect(wrapper.state().selection).toEqual({ end: 0, start: 0 })
  })

  it('should change state.inputValue when typing inside input', () => {
    span.simulate('click')
    const input = wrapper.find('TextInput')
    input.simulate('change', 'name')
    expect(wrapper.state().inputValue).toEqual('name')
  })

  it('should change to span on blur', () => {
    span.simulate('click')
    const input = wrapper.find('TextInput')
    input.simulate('blur')
    expect(wrapper.find('span').exists()).toEqual(true)
    expect(wrapper.find('TextInput').exists()).toEqual(false)
  })

  it('should change to span when `Enter` is pressed', () => {
    span.simulate('click')
    const input = wrapper.find('TextInput')
    input.simulate('keyPress', { key: 'Enter' })
    expect(wrapper.find('span').exists()).toEqual(true)
    expect(wrapper.find('TextInput').exists()).toEqual(false)
  })
})

describe('ref', () => {
  it('is passed correctly', () => {
    const wrapper = createWrapper({ placeholder: '' })
    const span = wrapper.find('span')
    span.simulate('click')

    const input = wrapper.find('TextInput')
    wrapper.instance().setRef(input)

    expect(wrapper.instance()._input).toEqual(input)
    wrapper.unmount()
  })
})

describe('componentDidUpdate', () => {
  it('triggers input focus if state.editing is set to true', () => {
    const wrapper = mount(<InlineInput placeholder='' />)
    const mock = jest.spyOn(wrapper.instance(), 'focusInput')
    const span = wrapper.find('span')
    span.simulate('click')
    expect(mock).toHaveBeenCalled()
    wrapper.unmount()
  })
})

describe('span value', () => {
  const expectedValue = 'Name'
  it('should equal to empty string by default', () => {
    let wrapper = createWrapper({ placeholder: expectedValue })
    let span = wrapper.find('span')
    let spanValue = span.props().children
    expect(spanValue).toEqual(expectedValue)
  })

  it('should equal to state.inputValue if it is not an empty string', () => {
    const wrapper = createWrapper({ placeholder: 'Placeholder', value: expectedValue })
    const span = wrapper.find('span')
    const spanValue = span.props().children
    expect(spanValue).toEqual(expectedValue)
  })

  it('should equal to placeholder if input value is an empty string', () => {
    const wrapper = createWrapper({ placeholder: expectedValue, value: '' })
    const span = wrapper.find('span')
    const spanValue = span.props().children
    expect(spanValue).toEqual(expectedValue)
  })

  it('should equal to emptyValue if input value is an empty string', () => {
    const wrapper = createWrapper({ emptyValue: expectedValue, placeholder: 'placeholder text', value: '' })
    const span = wrapper.find('span')
    const spanValue = span.props().children
    expect(spanValue).toEqual(expectedValue)
  })
})

describe('handleInputChange', () => {
  it('should be called when typing inside input', () => {
    const onChange = jest.fn()
    const wrapper = createWrapper({ placeholder: '', onChange })
    const span = wrapper.find('span')
    span.simulate('click')
    const input = wrapper.find('TextInput')
    input.simulate('change', 'name')
    expect(onChange).toHaveBeenCalled()
  })
})
