import React from 'react'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import ModalFooter from '../src/ModalFooter'

const name = prefix('modal-footer')

describe('<ModalFooter />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <ModalFooter>
        Blabla
      </ModalFooter>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('allows additional class names', () => {
    const wrapper = shallow(
      <ModalFooter className='abc'>
        Blabla
      </ModalFooter>
    )

    expect(wrapper.hasClass(name)).toBe(true)
    expect(wrapper.hasClass('abc')).toBe(true)
  })

  it('passes unknown properties', () => {
    const wrapper = shallow(
      <ModalFooter role='footer'>
        Blabla
      </ModalFooter>
    )

    expect(wrapper.props().role).toBe('footer')
  })
})
