import React from 'react'
import { shallow } from 'enzyme'

import TimelineElement from '../src/TimelineElement'

const moduleName = 'talixo-timeline-element'

describe('<TimelineLine />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<TimelineElement />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders class name correctly', () => {
    const wrapper = shallow(<TimelineElement />)

    expect(wrapper.prop('className')).toBe(moduleName)
  })

  it('renders time corectly', () => {
    const wrapper = shallow(<TimelineElement time='13:45' />)

    expect(wrapper.find(`.${moduleName}__time`)).toHaveLength(1)
  })

  it('doesn`t renders time when not passed', () => {
    const wrapper = shallow(<TimelineElement />)

    expect(wrapper.find(`.${moduleName}__time`)).toHaveLength(0)
  })
})
