import React from 'react'
import { shallow } from 'enzyme'

import Sidebar from '../src/Sidebar'

describe('<Sidebar />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Sidebar />)

    expect(wrapper).toMatchSnapshot()
  })
})
