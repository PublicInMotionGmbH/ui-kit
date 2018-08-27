import React from 'react'
import { shallow } from 'enzyme'

import TimelinePoint from '../src/TimelinePoint'

const moduleName = 'talixo-timeline-point'

describe('<TimelineLine />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<TimelinePoint />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders class name correctly', () => {
    const wrapper = shallow(<TimelinePoint />)

    expect(wrapper.prop('className')).toBe(moduleName)
  })
})
