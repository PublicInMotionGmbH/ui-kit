import React from 'react'
import { shallow } from 'enzyme'

import Heading from '../src/Heading'

describe('<Heading />', () => {
  it('renders empty correctly', () => {
    const wrapper = shallow(<Heading />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders children correctly', () => {
    const wrapper = shallow(
      <Heading>
        Primary information
      </Heading>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should allow different heading levels', () => {
    const wrapper = shallow(
      <Heading level={3}>
        Primary information
      </Heading>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
