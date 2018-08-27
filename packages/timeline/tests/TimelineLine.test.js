import React from 'react'
import { shallow } from 'enzyme'

import TimelineLine from '../src/TimelineLine'

const moduleName = 'talixo-timeline-line'

describe('<TimelineLine />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<TimelineLine />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders class name correctly', () => {
    const wrapper = shallow(<TimelineLine />)

    expect(wrapper.prop('className')).toBe(moduleName)
  })
})
