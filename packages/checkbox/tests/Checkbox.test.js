import React from 'react'
import Checkbox from '../src/Checkbox'
import { shallow } from 'enzyme'

describe('<Checkbox />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Checkbox />)
    expect(wrapper).toMatchSnapshot()
  })
})
