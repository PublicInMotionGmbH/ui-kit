import React from 'react'
import Pill from '../src/Pill'
import { shallow } from 'enzyme'

describe('<Pill />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Pill />)

    expect(wrapper).toMatchSnapshot()
  })
})
