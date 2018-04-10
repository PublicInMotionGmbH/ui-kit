import React from 'react'
import Dropdown from '../src/Dropdown'
import { mount } from 'enzyme'
import { prefix } from '@talixo/shared'

const name = prefix('combo-box')

describe('<Dropdown />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <Dropdown items={[1, 3, 5]} />
    )

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('opens dropdown menu when clicked', () => {
    const wrapper = mount(
      <Dropdown
        placeholder='Choose number'
        items={[1, 3, 5]}
      />
    )
    wrapper.find(`.${name}__button`).simulate('click')
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
