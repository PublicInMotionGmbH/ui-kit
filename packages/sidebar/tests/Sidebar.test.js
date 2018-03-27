import React from 'react'
import Sidebar from '../src/Sidebar'
import { shallow } from 'enzyme'

describe('<Sidebar />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Sidebar />)

    expect(wrapper).toMatchSnapshot()
  })
})
