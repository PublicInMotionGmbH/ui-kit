import React from 'react'
import Switcher from '../src/Switcher'
import { shallow } from 'enzyme'

describe('<Switcher />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Switcher />)

    expect(wrapper).toMatchSnapshot()
  })
})
