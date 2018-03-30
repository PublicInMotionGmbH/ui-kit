import React from 'react'
import Segment from '../src/Segment'
import { shallow } from 'enzyme'

describe('<Segment />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Segment>12</Segment>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders properly with any props', () => {
    const wrapper = shallow(
      <Segment size={12} medium={6} large={3} xlarge={3}>
        12/6/3
      </Segment>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
