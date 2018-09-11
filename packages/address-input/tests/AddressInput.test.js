import React from 'react'
import { mount } from 'enzyme'

import { buildClassName } from '@talixo/shared'

import AddressInput, { moduleName } from '../src/AddressInput'
import { locations } from './fixtures/locations'

const createWrapper = props => mount(<AddressInput {...props} />)

jest.mock('lodash/debounce', () => (fn, time) => {
  let timeout

  const debounced = (...args) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => fn(...args), time)
  }

  debounced.cancel = () => clearTimeout(timeout)
  return debounced
})

describe('<AddressInput />', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper()
    })

    afterEach(() => {
      wrapper.unmount()
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
      const footer = wrapper.find('AutoComplete').props().footer
      const placeholder = wrapper.find('TextInput').props().placeholder

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
    let wrapper, input

    beforeEach(() => {
      wrapper = createWrapper(props)
      input = wrapper.find('input')
      jest.useFakeTimers()
    })

    afterEach(() => {
      wrapper.unmount()
      jest.clearAllTimers()
      jest.useRealTimers()
    })

    it('should invoke onChange', () => {
      props.onChange.mockReset()
      input.simulate('change', { target: { value: testValue } })
      expect(props.onChange).toHaveBeenCalledTimes(1)
      expect(props.onChange).toHaveBeenCalledWith(null)
    })

    it('should invoke onFocus', () => {
      props.onFocus.mockReset()
      input.simulate('focus')
      expect(props.onFocus).toHaveBeenCalledTimes(1)
    })

    it('should invoke onBlur', () => {
      props.onBlur.mockReset()
      input.simulate('blur')
      expect(props.onBlur).toHaveBeenCalledTimes(1)
    })

    it('should invoke onLoadRequest', () => {
      props.onLoadRequest.mockReset()
      input.simulate('change', { target: { value: testValue } })
      jest.runAllTimers()
      expect(props.onLoadRequest).toHaveBeenCalledTimes(1)
      expect(props.onLoadRequest).toHaveBeenCalledWith(testValue)
    })

    it('should invoke onStopRequest', () => {
      props.onStopRequest.mockReset()
      input.simulate('change', { target: { value: testValue.slice(0, 2) } })
      expect(props.onStopRequest).toHaveBeenCalledTimes(1)
    })

    it('should handle tab key pressing when only 1 location is available', () => {
      wrapper.setProps({ locations: locations.slice(0, 1) })
      props.onChange.mockReset()

      input.simulate('keydown', { which: 9 })

      expect(props.onChange).toHaveBeenCalledTimes(1)
      expect(props.onChange).toHaveBeenCalledWith(locations[0])
    })

    it('should not change inputValue when the smae value is passed', () => {
      props.onChange.mockReset()
      wrapper.setState({ inputValue: testValue })
      input.simulate('change', { target: { value: testValue } })

      expect(props.onChange).not.toHaveBeenCalled()
    })

    it('should set proper value when it is received', () => {
      wrapper.setProps({ value: locations[0] })
      expect(wrapper.state().value).toBe(locations[0])
    })

    it('should show loader when loading prop is true', () => {
      wrapper.setProps({ loading: true })
      expect(wrapper.find('ProgressRing').exists()).toBe(true)
    })

    describe('when input is blurred', () => {
      it('should invoke onBlur', () => {
        props.onBlur.mockReset()
        input.simulate('blur')
        expect(props.onBlur).toHaveBeenCalledTimes(1)
      })

      it('should set first value from locations when input is blurred', () => {
        props.onBlur.mockReset()
        props.onChange.mockReset()
        wrapper.setProps({ locations })
        input.simulate('blur')

        expect(props.onChange).toHaveBeenCalledTimes(1)
        expect(props.onChange).toHaveBeenCalledWith(locations[0])

        expect(props.onBlur).toHaveBeenCalledTimes(1)
      })

      it('should set proper search query when input is blurred', () => {
        const location = locations[0]
        delete location.meta
        wrapper.setState({ value: locations[0] })
        input.simulate('blur')
        expect(wrapper.state().inputValue).toBe(location.address)
      })
    })
  })

  describe('mobile version', () => {
    const fakeCls = `.${buildClassName([moduleName, 'fake-input'])}`

    describe('rendering', () => {
      let wrapper
      beforeEach(() => {
        wrapper = createWrapper()
        const deviceswap = wrapper.find('DeviceSwap')
        deviceswap.instance().updateCurrentViewType('mobile')
        wrapper.update()
      })

      afterEach(() => {
        wrapper.unmount()
      })

      it('should render properly', () => {
        expect(wrapper).toMatchSnapshot()
      })

      it('should render mobile input', () => {
        const fakeInput = wrapper.find(fakeCls)
        fakeInput.simulate('click')
        expect(wrapper).toMatchSnapshot()
      })

      it('should render footer properly', () => {
        const footer = (() => <div className='test-footer'>test footer</div>)()
        wrapper.setProps({ footer })

        const fakeInput = wrapper.find(fakeCls)
        fakeInput.simulate('click')
        const footerElem = wrapper.find('AutoComplete').props().footer

        expect(footerElem).toBe(footer)
      })
    })

    describe('mobile functionality', () => {
      let wrapper

      beforeEach(() => {
        wrapper = createWrapper()

        const deviceswap = wrapper.find('DeviceSwap')
        deviceswap.instance().updateCurrentViewType('mobile')
        wrapper.update()
      })

      afterEach(() => {
        wrapper.unmount()
      })

      it('should render Address component when value is provided', () => {
        wrapper.setState({ value: locations[0] })
        expect(wrapper.find('Address')).toHaveLength(1)
      })

      it('should clear input value', () => {
        const inputValue = 'test-value'
        const fakeInput = wrapper.find(fakeCls)
        fakeInput.simulate('click')
        wrapper.setState({ inputValue })

        const clearIcon = wrapper.find('Icon')
        clearIcon.simulate('click')

        expect(wrapper.state().inputValue).toBe('')
      })

      it('should invoke onChange when user chooses something from the list', () => {
        const onChange = jest.fn()
        wrapper.setProps({ locations, onChange })
        wrapper.setState({ focus: true })

        const autocomplete = wrapper.find('AutoComplete')
        autocomplete.props().onChoose(locations[0])
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith(locations[0])
      })

      it('should show loader when loading prop is true', () => {
        const fakeInput = wrapper.find(fakeCls)
        fakeInput.simulate('click')
        wrapper.setProps({ loading: true })
        expect(wrapper.find('ProgressRing').exists()).toBe(true)
      })
    })
  })
})
