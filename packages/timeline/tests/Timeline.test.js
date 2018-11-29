import React from 'react'
import { shallow } from 'enzyme'

import Timeline from '../src/Timeline'

const moduleName = 'talixo-timeline'

describe('<Timeline />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Timeline />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders class name correctly', () => {
    const wrapper = shallow(<Timeline />)

    expect(wrapper.prop('className')).toBe(moduleName)
  })
})
