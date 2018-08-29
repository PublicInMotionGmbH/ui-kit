import React from 'react'
import { shallow } from 'enzyme'

import AddressInput from '../src/AddressInput'
import { locations } from './fixtures/locations'

const createWrapper = props => shallow(<AddressInput {...props} />)

describe('<AddressInput />', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper()
    })

    it('renders children correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should handle basic props (className, footer, placeholder)', () => {
      const props = {
        className: 'test-class-name',
        footer: <div className='test-footer'>test footer</div>,
        placeholder: 'test-placeholder'
      }
      wrapper.setProps(props)
      const placeholder = wrapper.children().dive().childAt(0).childAt(0).props().placeholder
      const footer = wrapper.children().dive().childAt(0).props().footer

      expect(wrapper.props().className).toMatch(/( |^)test-class-name( |$)/)
      expect(placeholder).toBe(props.placeholder)
      expect(footer).toBe(props.footer)
    })
  })

  describe('search functionality', () => {
    const props = {
      onBlur: jest.fn(),
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onLoadRequest: jest.fn(() => locations),
      onStopRequest: jest.fn(() => [])
    }
    const testValue = 'ber'
    let wrapper, input, autocomplete// , input2

    beforeEach(() => {
      wrapper = createWrapper(props)
      autocomplete = wrapper.childAt(0).dive().childAt(0)// .childAt(0)
      input = wrapper.childAt(0).dive().childAt(0).childAt(0)
      // input2 = wrapper.childAt(0).dive().childAt(0).childAt(0).dive().instance().onInputChange
      console.log(autocomplete.debug())
      console.log(input.debug())
    })

    it('should invoke onChange', () => {
      props.onChange.mockReset()
      autocomplete.simulate('focus')
      input.simulate('change', { target: { value: testValue } })
      // wrapper.instance().onInputValueChange(testValue)
      // expect(props.onChange).toHaveBeenCalledTimes(1)
      // expect(props.onChange).toHaveBeenCalledWith(null)
    })

    it('should invoke onBlur', () => {
      input.simulate('blur')
      props.onBlur.mockReset()
      wrapper.instance().onInputValueChange(testValue)
      // expect(props.onBlur).toHaveBeenCalledTimes(1)
      // expect(props.onBlur).toHaveBeenCalledWith(null)
    })
  })

  describe('mobile version', () => {

  })

  describe('props handling', () => {

  })
})
