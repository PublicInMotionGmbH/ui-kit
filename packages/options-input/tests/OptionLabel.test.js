import React from 'react'
import { shallow } from 'enzyme'

import OptionLabel from '../src/OptionLabel'

// Option for testing
const option = {id: 'person', icon: 'person', label: 'Adults', description: 'Older than 15', default: 1}

describe('<OptionLabel />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<OptionLabel option={option} />)

    expect(wrapper).toMatchSnapshot()
  })
})
