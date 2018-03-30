import React from 'react'
import Typography from '../src/Typography'
import { shallow } from 'enzyme'

describe('<Typography />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Typography />)

    expect(wrapper).toMatchSnapshot()
  })
})
