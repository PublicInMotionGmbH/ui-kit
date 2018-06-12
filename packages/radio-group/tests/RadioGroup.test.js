import React from 'react'
import { shallow } from 'enzyme'

import RadioGroup from '../src/RadioGroup'

// Mock data
const options = [{ value: 1, label: 'one' }, { value: 2, label: 'two' }, { value: 3, label: 'three' }]

const createProps = (props) => ({
  options,
  name: 'radio-group',
  ...props
})
const createWrapper = (props = createProps()) => shallow(<RadioGroup {...props} />)

describe('<RadioGroup />', () => {
  it('renders children correctly', () => {
    const wrapper = createWrapper()
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass prop name to input', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('RadioInput').first().prop('name')).toBe('radio-group')
  })

  it('should pass prop options to input', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('RadioInput').first().prop('value')).toBe(1)
  })

  it('should set default option', () => {
    const props = createProps({ value: 2 })
    const wrapper = createWrapper(props)
    const RadioInput = wrapper.find('RadioInput')

    expect(RadioInput.at(0).prop('checked')).toBe(false)
    expect(RadioInput.at(1).prop('checked')).toBe(true)
    expect(RadioInput.at(2).prop('checked')).toBe(false)
  })

  it('should set as disabled appropriate options', () => {
    const newOptions = [{ value: 1, label: 'one', disabled: true }, { value: 2, label: 'two', disabled: true }, { value: 3, label: 'three' }]
    const props = createProps({ options: newOptions })
    const wrapper = createWrapper(props)
    const RadioInput = wrapper.find('RadioInput')

    expect(RadioInput.at(0).prop('disabled')).toBe(true)
    expect(RadioInput.at(1).prop('disabled')).toBe(true)
    expect(RadioInput.at(2).prop('disabled')).toBe(false)
  })

  it('should render label correctly', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('RadioInput').at(1).dive().find('span').text()).toEqual('two')
  })

  describe('when passing props', () => {
    const props = createProps({
      onChange: jest.fn(),
      name: 'RadioGroupOne'
    })
    let wrapper, input

    beforeEach(() => {
      wrapper = createWrapper(props)
      input = wrapper.find('RadioInput').at(0)
      console.log(input.props().o)
      input.simulate('change', { target: { checked: true } })
    })

    it('should call onChange function', () => {
      expect(props.onChange).toHaveBeenCalled()
    })

    it('should pass prop name to input', () => {
      expect(input.props().name).toMatch(props.name)
    })
  })
})
