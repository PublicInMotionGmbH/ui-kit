import React from 'react'
import { shallow } from 'enzyme'

import SidebarPanel from '../src/Panel'

describe('<SidebarPanel />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<SidebarPanel />)

    expect(wrapper).toMatchSnapshot()
  })
})
