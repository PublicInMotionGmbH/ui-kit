import React from 'react'
import { shallow, mount } from 'enzyme'

import { prefix } from '@talixo/shared'

import PhoneInput from '../src/PhoneInput'

const moduleName = prefix('phone-input')
const flagName = prefix('country-flag')
const comboName = prefix('combo-box')

describe('<PhoneInput />', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('renders children correctly', () => {
    const wrapper = shallow(<PhoneInput />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should not render any flag when number is empty', () => {
    const wrapper = mount(
      <PhoneInput />
    )

    expect(wrapper.find(`.${flagName}`).length).toBe(0)

    wrapper.unmount()
  })

  it('should render correct flag for correct prefix', () => {
    const wrapper = mount(
      <PhoneInput value='+48' />
    )

    expect(wrapper.find(`.${flagName}`).length).toBe(1)

    wrapper.unmount()
  })

  it('should render correct flag for correct value with spaces', () => {
    const wrapper = mount(
      <PhoneInput value='+48 555 555' />
    )

    expect(wrapper.find(`.${flagName}`).length).toBe(1)

    wrapper.unmount()
  })

  it('should render correct flag for correct value without spaces', () => {
    const wrapper = mount(
      <PhoneInput value='+48555555' />
    )

    expect(wrapper.find(`.${flagName}`).length).toBe(1)

    wrapper.unmount()
  })

  it('should trigger onChange event when phone number is changed', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <PhoneInput
        value='+48 555555'
        onChange={spy}
      />
    )

    wrapper.find('input').simulate('change', {
      target: {
        value: '+48 555'
      }
    })

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ '+48 555' ])

    wrapper.unmount()
  })

  it('should trigger onChange event when prefix is changed', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <PhoneInput
        value='+48 555555'
        onChange={spy}
      />
    )

    // Open dropdown with prefixes
    wrapper.find(`.${comboName}__value`).simulate('click')
    jest.runAllTimers()
    wrapper.update()

    // Find first prefix item
    const prefix = wrapper.find(`.${comboName}__menu`).find(`.${moduleName}__country`).at(0)

    // Extract prefix
    const expected = prefix.find(`.${moduleName}__country__description > strong`).text()

    // Click first prefix item
    wrapper.find(`.${comboName}__menu`).find(`.${moduleName}__country`).at(0).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ `${expected} 555555` ])
  })

  it('should change from self-controlled to outside controlled', () => {
    const wrapper = mount(
      <PhoneInput />
    )

    wrapper.find('input').simulate('change', {
      target: {
        value: '+48 555'
      }
    })

    wrapper.setProps({ value: '+48 333 333' })
    expect(wrapper.find('input').getDOMNode().value).toBe('+48 333333')

    wrapper.unmount()
  })

  it('should self-control when no value is provided', () => {
    const wrapper = mount(
      <PhoneInput />
    )

    wrapper.find('input').simulate('change', {
      target: {
        value: '+48 555'
      }
    })

    expect(wrapper.find('input').getDOMNode().value).toBe('+48 555')

    wrapper.unmount()
  })
})
