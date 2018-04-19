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

    wrapper.find(`.${name}__button`).simulate('click')
    wrapper.update()

    expect(wrapper.find('button')).toMatchSnapshot()
    expect(wrapper.find(`.${name}__options`).length).toBe(1)

    wrapper.unmount()
  })
})
