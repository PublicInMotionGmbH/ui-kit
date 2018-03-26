import React from 'react'

import Breadcrumbs from '../src/Breadcrumbs'
import { shallow } from 'enzyme'

describe('<Breadcrumbs />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Breadcrumbs divider='/'>
        <span>Home</span>
        <span>Issues</span>
        <span>Major</span>
      </Breadcrumbs>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
