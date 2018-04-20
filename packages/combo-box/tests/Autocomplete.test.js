import React from 'react'
import { mount } from 'enzyme'
import { prefix } from '@talixo/shared'

import freezeDownshiftId from './utils/freezeDownshiftId'

import Autocomplete from '../src/Autocomplete'

const name = prefix('combo-box')

describe('<Autocomplete />', () => {
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

    wrapper.find(`.${name}__input`).last().simulate('change')

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
