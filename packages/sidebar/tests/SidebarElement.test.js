import React from 'react'
import { shallow } from 'enzyme'

import SidebarElement from '../src/SidebarElement'

describe('<SidebarElement />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <SidebarElement
        icon='home'
        label='See more'
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
