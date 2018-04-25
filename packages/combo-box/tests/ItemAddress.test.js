import React from 'react'
import { shallow } from 'enzyme'

import ItemAddress from '../src/ItemAddress'

describe('<ItemAddress />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ItemAddress item={{ icon: 'credit_card', place: 'Hotel', address: 'Berlin' }} />)

    expect(wrapper).toMatchSnapshot()
  })
})
