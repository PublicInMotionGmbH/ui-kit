import React from 'react'
import { shallow } from 'enzyme'

import Map from '../src/Map'

describe('<Map />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Map apiKey='this is api key' />)

    expect(wrapper).toMatchSnapshot()
  })
})
