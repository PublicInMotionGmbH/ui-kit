import React from 'react'
import { mount } from 'enzyme'
import { prefix } from '@talixo/shared'

import Dropdown from '../src/Dropdown'

const name = prefix('combo-box')

describe('<Dropdown />', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('renders correctly', () => {
    const wrapper = mount(
      <Dropdown items={[1, 3, 5]} />
    )

    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(`${name}__options`).length).toBe(0)

    wrapper.unmount()
  })

  it('opens dropdown menu when clicked', () => {
    const wrapper = mount(
      <Dropdown
        placeholder='Choose number'
        items={[1, 3, 5]}
      />
    )

    const button = wrapper.find(`.${name}__button`)

    // Simulate click
    button.simulate('click')

    // Run single setTimeout with this.toggleMenu() in Downshift
    jest.runAllTimers()

    // Update view
    wrapper.update()

    expect(wrapper.find(`.${name}__button`)).toMatchSnapshot()
    expect(wrapper.find(`.${name}__options`).length).toBe(1)

    wrapper.unmount()
  })
})
