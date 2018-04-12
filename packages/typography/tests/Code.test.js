import React from 'react'
import { shallow } from 'enzyme'

import Code from '../src/Code'

describe('<Code />', () => {
  it('renders empty correctly', () => {
    const wrapper = shallow(<Code />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders children correctly', () => {
    const wrapper = shallow(
      <Code>
        const x = 10
      </Code>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
