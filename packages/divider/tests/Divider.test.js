import React from 'react'
import { shallow } from 'enzyme'

import Divider from '../src/Divider'

describe('<Divider />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Divider />)

    expect(wrapper).toMatchSnapshot()
  })
  it('renders children correctly', () => {
    const wrapper = shallow(<Divider>Test divider</Divider>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render children inside component', () => {
    const insideText = 'Test text'
    const wrapper = shallow(<Divider>{insideText}</Divider>)

    expect(wrapper.text()).toBe(insideText)
  })
})
