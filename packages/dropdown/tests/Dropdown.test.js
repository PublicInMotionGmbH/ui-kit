import React from 'react'
import Dropdown from '../src/Dropdown'
import DropdownButtonRenderer from '../src/DropdownButtonRenderer'
import DropdownMenu from '../src/DropdownMenu'
import { mount } from 'enzyme'
import { prefix } from '@talixo/commons'

const name = prefix('select')

describe('<Dropdown />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <Dropdown menuComponent={DropdownMenu} toggleComponent={DropdownButtonRenderer} items={[1, 3, 5]} />
    )

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('opens dropdown menu when clicked', () => {
    const wrapper = mount(
      <Dropdown
        menuComponent={DropdownMenu}
        toggleComponent={DropdownButtonRenderer}
        placeholder='Choose number'
        items={[1, 3, 5]}
      />
    )
    wrapper.find(`.${name}-button`).simulate('click')
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
