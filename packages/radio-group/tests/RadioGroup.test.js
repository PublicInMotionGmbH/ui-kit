import React from 'react'
import { shallow } from 'enzyme'

import RadioGroup from '../src/RadioGroup'

// Mock data
const options = [
  { value: 1, label: 'one' },
  { value: 2, label: 'two' },
  { value: 3, label: 'three' }
]

const createProps = (props) => ({
  options,
  name: 'radio-group',
  ...props
})
const createWrapper = (props = createProps()) => shallow(<RadioGroup {...props} />)

describe('<RadioGroup />', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper()
    })

    it('renders children correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should pass prop name to input', () => {
      expect(wrapper.find('RadioInput').first().prop('name')).toBe('radio-group')
    })

    it('should pass prop options to input', () => {
      expect(wrapper.find('RadioInput').first().prop('value')).toBe(1)
    })
  })
  describe('props handling', () => {
    const newOptions = [{ value: 1, label: 'one', disabled: true }, { value: 2, label: 'two', disabled: true }, { value: 3, label: 'three' }]
    const props = createProps({ value: 2, options: newOptions })
    let wrapper, radioInput

    beforeEach(() => {
      wrapper = createWrapper(props)
      radioInput = wrapper.find('RadioInput')
    })

    it('should set default option', () => {
      expect(radioInput.at(0).prop('checked')).toBe(false)
      expect(radioInput.at(1).prop('checked')).toBe(true)
      expect(radioInput.at(2).prop('checked')).toBe(false)
    })

    it('should change checked value', () => {
      wrapper.setProps({ value: 3 })
      radioInput = wrapper.find('RadioInput')

      expect(wrapper.state().value).toBe(3)
      expect(radioInput.at(0).prop('checked')).toBe(false)
      expect(radioInput.at(1).prop('checked')).toBe(false)
      expect(radioInput.at(2).prop('checked')).toBe(true)
    })

    it('should set as disabled appropriate options', () => {
      expect(radioInput.at(0).prop('disabled')).toBe(true)
      expect(radioInput.at(1).prop('disabled')).toBe(true)
      expect(radioInput.at(2).prop('disabled')).toBe(false)
    })

    it('should render label correctly', () => {
      expect(radioInput.at(1).dive().find('span').text()).toEqual('two')
    })
  })

  describe('handling events', () => {
    const props = createProps({ onChange: jest.fn() })
    let wrapper, input

    beforeEach(() => {
      wrapper = createWrapper(props)
      input = wrapper.find('RadioInput').at(0).dive().find('input')
    })

    it('should call onChange function', () => {
      props.onChange.mockReset()
      input.simulate('change', { target: { checked: true } })
      expect(props.onChange).toHaveBeenCalled()
    })

    it('should not call onChange function', () => {
      props.onChange.mockReset()
      input.simulate('change', { target: { checked: false } })
      expect(props.onChange).not.toHaveBeenCalled()
    })
  })

  describe('handling custom option', () => {
    describe('default component', () => {
      const props = createProps({
        allowCustom: true,
        onChange: jest.fn(),
        onCustomChange: jest.fn()
      })
      let wrapper, textInput

      beforeEach(() => {
        wrapper = createWrapper(props)
        textInput = wrapper.find('TextInput')
      })

      it('should render text input', () => {
        expect(textInput.exists()).toBe(true)
      })

      it('should invoke props.onChange when text input is focused', () => {
        props.onChange.mockReset()
        textInput.dive().find('input').simulate('focus', {})

        expect(props.onChange).toHaveBeenCalledTimes(1)
        expect(props.onChange).toHaveBeenCalledWith('custom', expect.anything())
      })

      it('should invoke props.onChange when text input is focused', () => {
        const newText = 'test text'
        props.onChange.mockReset()
        textInput.dive().find('input').simulate('change', { target: { value: newText } })

        expect(props.onCustomChange).toHaveBeenCalledTimes(1)
        expect(props.onCustomChange).toHaveBeenCalledWith(newText)
      })
    })

    describe('custom component', () => {
      const customProps = { onFocus: jest.fn() }
      const CustomComponent = (props) => <input />
      const props = createProps({
        allowCustom: true,
        onChange: jest.fn(),
        onCustomChange: jest.fn(),
        customComponent: <CustomComponent {...customProps} />
      })
      let wrapper, custom

      beforeEach(() => {
        wrapper = createWrapper(props)
        custom = wrapper.find(CustomComponent)
      })

      it('should render custom component', () => {
        expect(custom.exists()).toBe(true)
      })

      it('should properly invoke custom component onFocus function', () => {
        custom.simulate('focus', {})
        expect(props.onChange).toHaveBeenCalledTimes(1)
        expect(props.onChange).toHaveBeenCalledWith('custom', expect.anything())
        expect(customProps.onFocus).toHaveBeenCalledTimes(1)
      })
    })
  })
})
