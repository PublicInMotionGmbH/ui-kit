import React from 'react'
import { shallow } from 'enzyme'

import Columns from '../src/Columns'

describe('<Columns />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Columns>
        <h2>1. Amet cillum deserunt.</h2>
      </Columns>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('passes props to children component correctly', () => {
    const wrapper = shallow(
      <Columns maxColumns={3}>
        <h2>1. Amet cillum deserunt.</h2>
      </Columns>
    )

    expect(wrapper.find('h2').prop('maxColumns')).toBe(3)
  })
})
