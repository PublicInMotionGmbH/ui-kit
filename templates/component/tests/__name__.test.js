import React from 'react'
import { shallow } from 'enzyme'

import __name__ from '../src/__name__'

describe('<__name__ />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<__name__ />)

    expect(wrapper).toMatchSnapshot()
  })
})
