import React from 'react'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import ModalHeader from '../src/ModalHeader'

const name = prefix('modal-header')

describe('<ModalHeader />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <ModalHeader>
        Blabla
      </ModalHeader>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('allows additional class names', () => {
    const wrapper = shallow(
      <ModalHeader className='abc'>
        Blabla
      </ModalHeader>
    )

    expect(wrapper.hasClass(name)).toBe(true)
    expect(wrapper.hasClass('abc')).toBe(true)
  })

  it('passes unknown properties', () => {
    const wrapper = shallow(
      <ModalHeader role='header'>
        Blabla
      </ModalHeader>
    )

    expect(wrapper.props().role).toBe('header')
  })
})
