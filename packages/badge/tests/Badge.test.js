import React from 'react'
import Badge from '../src/Badge'
import { shallow } from 'enzyme'

describe('<Badge />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Badge>Badge</Badge>)
    expect(wrapper).toMatchSnapshot()
  })
})
