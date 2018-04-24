import React from 'react'
import { shallow } from 'enzyme'

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
    const wrapper = shallow(<InlineInput />)
    wrapper.instance().focusInput(mock)
    expect(mock.focus).toHaveBeenCalled()
  })
})

describe('<InlineInput />', () => {
  let span, wrapper
  beforeEach(() => {
    wrapper = createWrapper()
    span = wrapper.find('span')
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('passes className to wrapper', () => {
    const className = 'new-class-name'
    const wrapperWithProps = createWrapper({ className: className })
    expect(wrapperWithProps.props().className.includes(className)).toEqual(true)
  })

  it('renders disabled correctly', () => {
    const wrapperWithProps = createWrapper({ disabled: true })
    expect(wrapperWithProps.props().className.includes('disabled')).toEqual(true)
  })

  it('should not change to input when disabled is set to true', () => {
    const wrapper = createWrapper({ disabled: true })
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
    global.getSelection = jest.fn(() => {
      return {
        anchorOffset: 0,
        focusOffset: 0
      }
    })
    // global.getSelection()
    span.simulate('click')
    expect(wrapper.state().selected).toEqual(true)
  })

  it('should change state.selection if text is selected', () => {
    global.getSelection = jest.fn(() => {
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
    input.simulate('change', { target: { value: 'name' } })
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
    const wrapper = createWrapper()
    const span = wrapper.find('span')
    span.simulate('click')

    const input = wrapper.find('TextInput')
    wrapper.instance().setRef(input)

    expect(wrapper.instance()._input).toEqual(input)
    wrapper.unmount()
  })
})
