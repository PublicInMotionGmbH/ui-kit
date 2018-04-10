import React from 'react'
import ComboBox from '../src/ComboBox'
import DropdownButton from '../src/DropdownButton'
import Menu from '../src/Menu'
import { mount } from 'enzyme'
import { prefix } from '@talixo/shared'

const name = prefix('combo-box')

describe('<ComboBox />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <ComboBox menuComponent={Menu} toggleComponent={DropdownButton} items={[1, 3, 5]} />
    )

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('opens dropdown menu when clicked', () => {
    const wrapper = mount(
      <ComboBox
        menuComponent={Menu}
        toggleComponent={DropdownButton}
        placeholder='Choose number'
        items={[1, 3, 5]}
      />
    )
    wrapper.find(`.${name}__button`).simulate('click')
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
