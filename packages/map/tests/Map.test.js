import React from 'react'
import { shallow } from 'enzyme'

import Map from '../src/Map'

describe('<Map />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Map apiKey='this_is_api_key' />)

    expect(wrapper).toMatchSnapshot()
  })
})
