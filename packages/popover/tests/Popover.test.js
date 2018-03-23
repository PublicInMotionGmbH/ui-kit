import React from 'react'
import Popover from '../src/Popover'
import { shallow } from 'enzyme'

describe('<Popover />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Popover />)

    expect(wrapper).toMatchSnapshot()
  })
})
