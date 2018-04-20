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
    const wrapper = createWrapper({ className: className })
    expect(wrapper.props().className.includes(className)).toEqual(true)
  })

  it('renders disabled correctly', () => {
    const wrapper = createWrapper({ disabled: true })
    expect(wrapper.props().className.includes('disabled')).toEqual(true)
  })

  it('should not change to input when disabled is set to true', () => {
    const wrapper = createWrapper({ disabled: true })
    span.simulate('click')
    expect(wrapper.find('span').exists()).toEqual(true)
    expect(wrapper.find('input').exists()).toEqual(false)
  })

  it('should change state.editing to true when span is clicked', () => {
    span.simulate('click')
    expect(wrapper.state().editing).toEqual(true)
  })

  it('should change span to input when span is clicked', () => {
    span.simulate('click')
    expect(wrapper.find('span').exists()).toEqual(false)
    expect(wrapper.find('input').exists()).toEqual(true)
  })

  it('should change state.inputValue when typing inside input', () => {
    span.simulate('click')
    const input = wrapper.find('input')
    input.simulate('change', { target: { value: 'name' } })
    expect(wrapper.state().inputValue).toEqual('name')
  })

  it('should change to span on blur', () => {
    span.simulate('click')
    const input = wrapper.find('input')
    input.simulate('blur')
    expect(wrapper.find('span').exists()).toEqual(true)
    expect(wrapper.find('input').exists()).toEqual(false)
  })

  it('gets input ref correctly', () => {
    const wrapper = mount(<InlineInput />)
    const span = wrapper.find('span')
    span.simulate('click')
    const input = wrapper.find('input')
    wrapper.instance().setRef(input)
    expect(wrapper.instance()._input).toEqual(input)
    wrapper.unmount()
  })
})
