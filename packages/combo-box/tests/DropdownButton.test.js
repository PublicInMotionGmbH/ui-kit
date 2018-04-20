import React from 'react'
import { mount } from 'enzyme'
import { prefix } from '@talixo/shared'

import DropdownButton from '../src/DropdownButton'

const name = prefix('combo-box')

describe('<DropdownButton />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<DropdownButton />)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders no placeholder by default', () => {
    const wrapper = mount(<DropdownButton />)
    expect(wrapper.find(`.${name}__item`).exists()).toBe(true)
    expect(wrapper.find(`.${name}__item`).contains('Number')).toBe(false)
    wrapper.unmount()
  })

  it('renders placeholder correctly', () => {
    const wrapper = mount(<DropdownButton placeholder='Select item' />)
    expect(wrapper.find(`.${name}__item`).exists()).toBe(true)
    expect(wrapper.find(`.${name}__item`).contains('Number')).toBe(false)
    wrapper.unmount()
  })

  it('renders placeholder as value correctly', () => {
    const wrapper = mount(<DropdownButton value='apple' />)
    expect(wrapper.find(`.${name}__item`).exists()).toBe(true)
    expect(wrapper.find(`.${name}__item`).contains('apple')).toBe(true)
    wrapper.unmount()
  })

  it('renders overflow set to truncate correctly', () => {
    const wrapper = mount(<DropdownButton overflow='truncate' items={[1, 3, 5]} />)
    expect(wrapper.find(`.${name}__item`).exists()).toBe(true)
    expect(wrapper.find(`.${name}__item`).every(`.${name}__item--overflow-truncate`)).toBe(true)
    wrapper.unmount()
  })

  it('renders overflow set to break correctly', () => {
    const wrapper = mount(<DropdownButton overflow='break' items={[1, 3, 5]} />)
    expect(wrapper.find(`.${name}__item`).exists()).toBe(true)
    expect(wrapper.find(`.${name}__item`).every(`.${name}__item--overflow-break`)).toBe(true)
    wrapper.unmount()
  })
})
