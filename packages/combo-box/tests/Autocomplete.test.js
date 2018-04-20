import React from 'react'
import { mount } from 'enzyme'

import freezeDownshiftId from './utils/freezeDownshiftId'

import Autocomplete from '../src/Autocomplete'

describe('<Autocomplete />', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('renders correctly', () => {
    const wrapper = mount(
      <Autocomplete items={[1, 3, 5]} />
    )

    freezeDownshiftId(wrapper)

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('opens dropdown menu when input value changes', () => {
    const wrapper = mount(
      <Autocomplete
        placeholder='Choose number'
        items={[1, 3, 5]}
      />
    )

    freezeDownshiftId(wrapper)

    wrapper.find('input').last().simulate('change')

    // Run single setTimeout with this.toggleMenu() in Downshift
    jest.runAllTimers()

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
