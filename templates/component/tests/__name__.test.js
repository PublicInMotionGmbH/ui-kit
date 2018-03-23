import React from 'react'
import __name__ from '../src/__name__'
import { shallow } from 'enzyme'

describe('<__name__ />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<__name__ />)

    expect(wrapper).toMatchSnapshot()
  })
})
