import React from 'react'
import { shallow } from 'enzyme'

import Sidebar from '../src/Sidebar'

describe('<Sidebar />', () => {
  it('renders empty sidebar correctly', () => {
    const wrapper = shallow(<Sidebar />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should pass class name correctly', () => {
    const wrapper = shallow(
      <Sidebar className='blabla' />
    )

    expect(wrapper.hasClass('blabla')).toBeTruthy()
    expect(wrapper.hasClass('talixo-sidebar')).toBeTruthy()
  })

  it('should pass other attributes correctly', () => {
    const wrapper = shallow(
      <Sidebar role='navigation' />
    )

    expect(wrapper.props().role).toBe('navigation')
  })
})
