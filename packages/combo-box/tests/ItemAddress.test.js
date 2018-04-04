import React from 'react'
import ItemAddress from '../src/ItemAddress'
import { shallow } from 'enzyme'

describe('<ItemAddress />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ItemAddress item={{ icon: 'credit_card', place: 'Hotel', address: 'Berlin' }} />)

    expect(wrapper).toMatchSnapshot()
  })
})
