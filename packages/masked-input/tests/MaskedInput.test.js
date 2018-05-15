import React from 'react'
import { shallow } from 'enzyme'

import { AutoComplete } from '@talixo/combo-box'

import { TextInput } from '@talixo/text-input'

import MaskedInputHOC from '../src/MaskedInput'

const MaskedTextInput = MaskedInputHOC(TextInput)
const createProps = props => ({
  render: () => null,
  ...props
})
const createWrapper = (props = createProps()) => shallow(<MaskedTextInput {...props} />)

describe('<MaskedInput />', () => {
  let wrapper
  it('renders children correctly', () => {
    const wrapper = createWrapper()
    expect(wrapper).toMatchSnapshot()
  })

  describe('state changes', () => {
    let input
    beforeEach(() => {
      wrapper = createWrapper()
      input = wrapper.find('TextInput')
      console.log(input)
    })

    it('should change state.focused to true', () => {
      input.simulate('focus')
      input.simulate('blur')
      input.simulate('focus')
      expect(wrapper.state().focused).toBe(true)
    })

    it('should change state.focused to true', () => {
      input.simulate('focus')
      input.simulate('blur')
      expect(wrapper.state().focused).toBe(false)
    })

    it('should change state.value', () => {
      const value = 'Test text'
      input.dive().find('input').simulate('change', { target: { value } })
      expect(wrapper.state().value).toBe(value)
    })
  })
})
