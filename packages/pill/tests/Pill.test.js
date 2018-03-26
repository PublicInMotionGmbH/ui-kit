import React from 'react'
import { shallow } from 'enzyme'

import Pill from '../src/Pill'

describe('<Pill />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Pill />)

    expect(wrapper).toMatchSnapshot()
  })

  it('handles `size` properly', () => {
    const wrapper = shallow(
      <Pill color='blue'>
        Label
      </Pill>
    )

    expect(wrapper.props().className).toMatch(/(^| )talixo-pill--blue( |$)/)
  })

  it('handles `className` properly', () => {
    const wrapper = shallow(
      <Pill className='anything'>
        Label
      </Pill>
    )

    expect(wrapper.props().className).toMatch(/(^| )anything( |$)/)
  })

  it('handles different `span` props properly', () => {
    const wrapper = shallow(
      <Pill style={{ padding: 20 }}>
        Label
      </Pill>
    )

    expect(wrapper.props().style).toEqual({ padding: 20 })
  })
})
