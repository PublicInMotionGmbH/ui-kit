import React from 'react'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import TimeInput, { moduleName } from '../src/TimeInput'

const clsName = prefix(moduleName)

const createWrapper = (props) => shallow(<TimeInput {...props} />)

jest.mock('moment', () => {
  const moment = require.requireActual('moment')
  return moment.utc
})

const value = new Date('2018-05-10T00:00:00')

describe('<TimeInput />', () => {
  it('renders correctly', () => {
    const format = 'HH'
    const wrapper = createWrapper({ format, value })

    expect(wrapper).toMatchSnapshot()
  })

  it('renders open correctly', () => {
    const format = 'HH'
    const wrapper = createWrapper({ format, value })
    wrapper.setState({ open: true })
    const input = wrapper.find('TextInput')

    expect(input.hasClass(`${clsName}__input--open`)).toEqual(true)
  })
})

describe('onBlur', () => {
  it('is called when input looses focus', () => {
    const format = 'HH'
    const onBlur = jest.fn()
    const wrapper = createWrapper({ format, onBlur, value })

    const input = wrapper.find('TextInput')
    input.simulate('change', { target: 2 })
    input.simulate('blur')
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('passes value correctly', () => {
    let selectedSuffix, selectedValue
    const format = 'HH'
    const onBlur = jest.fn().mockImplementation((inputValue, suffix) => {
      selectedValue = inputValue
      selectedSuffix = suffix
    })
    const wrapper = createWrapper({ format, onBlur, value })

    wrapper.setState({ inputValue: '22', suffix: 'AM' })
    const input = wrapper.find('TextInput')
    input.simulate('blur')
    expect(selectedValue).toEqual('22')
    expect(selectedSuffix).toEqual('AM')
  })

  it('closes menu', () => {
    const format = 'HH'
    const wrapper = createWrapper({ format, value })

    wrapper.setState({ open: true })
    const input = wrapper.find('TextInput')
    input.simulate('blur')

    expect(wrapper.state().open).toEqual(false)
  })
})

describe('onFocus', () => {
  it('is called when input gains focus', () => {
    const format = 'HH'
    const wrapper = createWrapper({ format, value })

    const input = wrapper.find('TextInput')
    input.simulate('focus')
    expect(wrapper.state().open).toEqual(true)
  })
})

describe('onKeyDown', () => {
  it('is ignored if format is not `hh A`', () => {
    const format = 'HH'
    const wrapper = createWrapper({ format, value })

    wrapper.setState({ suffix: 'PM' })
    const input = wrapper.find('TextInput')
    input.simulate('keyDown', {
      which: 65,
      stopPropagation: () => {}
    })

    expect(wrapper.state().suffix).toEqual('PM')
  })

  it('changes state.suffix to `AM` when `a` is pressed', () => {
    const format = 'hh A'
    const wrapper = createWrapper({ format, value })

    wrapper.setState({ suffix: 'PM' })
    const input = wrapper.find('TextInput')
    input.simulate('keyDown', {
      which: 65,
      stopPropagation: () => {}
    })

    expect(wrapper.state().suffix).toEqual('AM')
  })

  it('changes state.suffix to `PM` when `p` is pressed', () => {
    const format = 'hh A'
    const wrapper = createWrapper({ format, value })

    wrapper.setState({ suffix: 'AM' })
    const input = wrapper.find('TextInput')
    input.simulate('keyDown', {
      which: 80,
      stopPropagation: () => {}
    })

    expect(wrapper.state().suffix).toEqual('PM')
  })
})
