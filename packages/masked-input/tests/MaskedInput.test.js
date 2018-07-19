import React from 'react'
import { shallow } from 'enzyme'

import { buildClassName } from '@talixo/shared'
import { Calendar } from '@talixo/calendar'

import MaskedInput, { moduleName } from '../src/MaskedInput'

const maskCls = buildClassName([moduleName, 'mask'])
const createProps = props => ({
  ...props
})
const createCalendar = (props = createProps()) => shallow(
  <MaskedInput {...props} renderMask={({ value }) => <div>{value.toString()}</div>}>
    <Calendar />
  </MaskedInput>
)

const createWrapper = (props, inputProps) => shallow(
  <MaskedInput {...props} renderMask={x => (<div className='test-mask'>{x.value}</div>)}>
    <input className='test-input' {...inputProps} />
  </MaskedInput>
)

describe('<MaskedInput />', () => {
  let wrapper
  it('renders children correctly', () => {
    const wrapper = createCalendar()
    expect(wrapper).toMatchSnapshot()
  })

  describe('state changes', () => {
    let input
    beforeEach(() => {
      wrapper = createCalendar()
      input = wrapper.find('Calendar')
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
      const value = '2020-12-31'
      input.simulate('change', value)
      expect(wrapper.state().value).toBe(value)
    })
  })

  describe('masking behaviour when value prop is undefined', () => {
    let input

    beforeEach(() => {
      wrapper = createCalendar()
      input = wrapper.find('Calendar')
    })

    it('should apply mask when correct date is passed', () => {
      const value = '2020-12-12'
      input.simulate('change', value)
      expect(wrapper.find(`.${maskCls}`).exists()).toBe(true)
    })

    it('should not apply mask when no value is passed', () => {
      const valuePre = '2020-12-12'
      input.simulate('change', valuePre)
      const valuePost = ''
      input.simulate('change', valuePost)
      expect(wrapper.find(`.${maskCls}`).exists()).toBe(false)
    })
  })
  describe('masking behaviour on when value is passed', () => {
    beforeEach(() => {
      wrapper = createWrapper({ value: null })
    })

    it('should not display mask when null is default value', () => {
      expect(wrapper.find('.test-mask').exists()).toBe(false)
    })

    describe('when value prop is updated', () => {
      const value = 'Test value'
      beforeEach(() => {
        wrapper.setProps({ value })
      })

      it('should display mask with passed value', () => {
        expect(wrapper.find('.test-mask').exists()).toBe(true)
      })

      it('should update mask component value', () => {
        expect(wrapper.find('.test-mask').text()).toBe(value)
      })
      it('should remove mask when null is passed to value prop', () => {
        wrapper.setProps({ value: null })
        expect(wrapper.find('.test-mask').exists()).toBe(false)
      })
    })
  })

  describe('masked input event handling', () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const onFocus = jest.fn()
    let input

    beforeEach(() => {
      wrapper = createWrapper({ onChange, onBlur, onFocus })
      input = wrapper.find('.test-input')
    })
    it('should invoke children onChange', () => {
      input.simulate('change', { target: { value: 'test' } })
      expect(onChange).toHaveBeenCalledTimes(1)
    })
    it('should invoke children onFocus', () => {
      input.simulate('focus')
      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(onFocus).toHaveBeenCalledWith(true)
    })
    it('should invoke children onBlur', () => {
      input.simulate('blur')
      expect(onBlur).toHaveBeenCalledTimes(1)
      expect(onBlur).toHaveBeenCalledWith(false)
    })
  })

  describe('children event handling', () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const onFocus = jest.fn()
    let input

    beforeEach(() => {
      wrapper = createWrapper({}, { onChange, onBlur, onFocus })
      input = wrapper.find('.test-input')
    })
    it('should invoke children onChange', () => {
      input.simulate('change', { target: { value: 'test' } })
      expect(onChange).toHaveBeenCalledTimes(1)
    })
    it('should invoke children onFocus', () => {
      input.simulate('focus')
      expect(onFocus).toHaveBeenCalledTimes(1)
    })
    it('should invoke children onBlur', () => {
      input.simulate('focus')
      input.simulate('change', { target: { value: 'test' } })
      input.simulate('blur')
      expect(onBlur).toHaveBeenCalledTimes(1)
    })
  })
})
