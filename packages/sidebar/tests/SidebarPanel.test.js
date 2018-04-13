import React from 'react'
import { shallow } from 'enzyme'

import SidebarPanel from '../src/SidebarPanel'

describe('<SidebarPanel />', () => {
  it('renders empty correctly', () => {
    const wrapper = shallow(<SidebarPanel />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders with header and icon correctly', () => {
    const wrapper = shallow(
      <SidebarPanel icon='settings' name='Something' />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders with header and content correctly', () => {
    const wrapper = shallow(
      <SidebarPanel icon='settings' name='Something'>
        There is some content
      </SidebarPanel>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should pass class name correctly', () => {
    const wrapper = shallow(
      <SidebarPanel className='blabla'>
        There is some content
      </SidebarPanel>
    )

    expect(wrapper.hasClass('blabla')).toBeTruthy()
    expect(wrapper.hasClass('talixo-sidebar-panel')).toBeTruthy()
  })

  it('should pass other attributes correctly', () => {
    const wrapper = shallow(
      <SidebarPanel role='navigation'>
        There is some content
      </SidebarPanel>
    )

    expect(wrapper.props().role).toBe('navigation')
  })
})
