import React from 'react'
import { shallow } from 'enzyme'

import Option from '../src/Option'

// Option for testing
const option = {id: 'person', icon: 'person', label: 'Adults', description: 'Older than 15', default: 1}

describe('<Option />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Option key={option.id} option={option} value={1} />)

    expect(wrapper).toMatchSnapshot()
  })
})
