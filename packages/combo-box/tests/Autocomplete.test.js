import React from 'react'
import Autocomplete from '../src/Autocomplete'
import { mount } from 'enzyme'
import { prefix } from '@talixo/shared'

const name = prefix('select')

describe('<Autocomplete />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <Autocomplete items={[1, 3, 5]} />
    )

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
    wrapper.find(`.${name}__input`).last().simulate('change')
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
