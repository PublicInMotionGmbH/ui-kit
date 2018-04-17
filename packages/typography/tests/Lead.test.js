import React from 'react'
import { shallow } from 'enzyme'

import Lead from '../src/Lead'

describe('<Lead />', () => {
  it('renders empty correctly', () => {
    const wrapper = shallow(<Lead />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders children correctly', () => {
    const wrapper = shallow(
      <Lead>We are very proud of how does it work.</Lead>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
