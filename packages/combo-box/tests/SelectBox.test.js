import React from 'react'
import { mount } from 'enzyme'

import Downshift from 'downshift'

import { prefix } from '@talixo/shared'
import { detector } from '@talixo/device-swap'

import SelectBox from '../src/SelectBox'

const moduleName = prefix('combo-box')

describe('<SelectBox />', () => {
  beforeEach(() => Downshift.resetIdCounter())

  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  beforeEach(() => detector.setViewType('desktop'))
  afterEach(() => detector.reset())

  it('should render correctly', () => {
    const wrapper = mount(
      <SelectBox />
    )

    expect(wrapper).toMatchSnapshot()

    wrapper.unmount()
  })

  it('should render menu when select box is opened and has options', () => {
    const wrapper = mount(
      <SelectBox isOpen options={[ 'abc', 'def' ]} />
    )

    expect(wrapper).toMatchSnapshot()

    wrapper.unmount()
  })

  it('should not render menu when select box is opened and has no options', () => {
    const wrapper = mount(
      <SelectBox isOpen />
    )

    expect(wrapper).toMatchSnapshot()

    wrapper.unmount()
  })

  it('should show select box with selected value', () => {
    const wrapper = mount(
      <SelectBox
        value='abc'
      />
    )

    expect(wrapper).toMatchSnapshot()

    wrapper.unmount()
  })

  it('should show multi-select box with many values', () => {
    const wrapper = mount(
      <SelectBox
        multi
        value={[ 'abc', 'def' ]}
      />
    )

    expect(wrapper).toMatchSnapshot()

    wrapper.unmount()
  })

  it('should open select box after click', () => {
    const wrapper = mount(
      <SelectBox options={[ 'abc', 'def' ]} />
    )

    wrapper.find(`.${moduleName}__value`).simulate('click')

    jest.runAllTimers()
    wrapper.update()

    const box = wrapper.find(`.${moduleName}`)

    expect(box.hasClass(`${moduleName}--open`)).toBe(true)
  })

  it('should close select box after 2nd click', () => {
    const wrapper = mount(
      <SelectBox options={[ 'abc', 'def' ]} />
    )

    wrapper.find(`.${moduleName}__value`).simulate('click')

    jest.runAllTimers()
    wrapper.update()

    wrapper.find(`.${moduleName}__value`).simulate('click')

    jest.runAllTimers()
    wrapper.update()

    const box = wrapper.find(`.${moduleName}`)

    expect(box.hasClass(`${moduleName}--open`)).toBe(false)
  })

  it('should close menu after selection', () => {
    const wrapper = mount(
      <SelectBox options={[ 'abc', 'def' ]} />
    )

    wrapper.find(`.${moduleName}__value`).simulate('click')

    jest.runAllTimers()
    wrapper.update()

    wrapper.find(`.${moduleName}__item`).at(0).simulate('click')

    jest.runAllTimers()
    wrapper.update()

    const box = wrapper.find(`.${moduleName}`)

    expect(box.hasClass(`${moduleName}--open`)).toBe(false)
  })

  it('should keep menu after selection in multi-select', () => {
    const wrapper = mount(
      <SelectBox multi options={[ 'abc', 'def' ]} />
    )

    wrapper.find(`.${moduleName}__value`).simulate('click')

    jest.runAllTimers()
    wrapper.update()

    wrapper.find(`.${moduleName}__item`).at(0).simulate('click')

    jest.runAllTimers()
    wrapper.update()

    const box = wrapper.find(`.${moduleName}`)

    expect(box.hasClass(`${moduleName}--open`)).toBe(true)
  })

  it('should work with onChange event for single selection', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <SelectBox
        isOpen
        options={[ 'abc', 'def' ]}
        onChange={spy}
      />
    )

    wrapper.find(`.${moduleName}__item`).at(0).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 'abc' ])
  })

  it('should work with onChange event for multi selection with 1 element', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <SelectBox
        multi
        isOpen
        options={[ 'abc', 'def' ]}
        onChange={spy}
      />
    )

    wrapper.find(`.${moduleName}__item`).at(0).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ [ 'abc' ] ])
  })

  it('should work with onChange event for multi selection with 2 elements', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <SelectBox
        multi
        isOpen
        options={[ 'abc', 'def' ]}
        onChange={spy}
      />
    )

    wrapper.find(`.${moduleName}__item`).at(0).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ [ 'abc' ] ])

    wrapper.setProps({ value: [ 'abc' ] })

    wrapper.find(`.${moduleName}__item`).at(1).simulate('click')

    expect(spy.mock.calls.length).toBe(2)
    expect(spy.mock.calls[1]).toEqual([ [ 'abc', 'def' ] ])
  })

  it('should unselect current element in multi', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <SelectBox
        multi
        isOpen value={[ 'abc' ]}
        options={[ 'abc', 'def' ]}
        onChange={spy}
      />
    )

    wrapper.find(`.${moduleName}__item`).at(0).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ [] ])
  })

  it('should remove current selection on `remove` button', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <SelectBox
        multi
        value='abc'
        options={[ 'abc', 'def' ]}
        onChange={spy}
      />
    )

    wrapper.find(`.${moduleName}__remove`).at(0).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ [] ])
  })
})
