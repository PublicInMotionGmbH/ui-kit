import React from 'react'

import Navigation from '../src/Navigation'
import { shallow } from 'enzyme'

describe('<Navigation />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Navigation>
        <span>Home</span>
        <span>Issues</span>
        <span>Major</span>
      </Navigation>
    )

    expect(wrapper.props().className.includes('navigation')).toEqual(true)
  })

  it('renders type pagination correctly', () => {
    const wrapper = shallow(
      <Navigation type='pagination'>
        <span>Home</span>
        <span>Issues</span>
        <span>Major</span>
      </Navigation>
    )

    expect(wrapper.props().className.includes('pagination')).toEqual(true)
  })

  it('renders type breadcrumbs correctly', () => {
    const wrapper = shallow(
      <Navigation type='breadcrumbs'>
        <span>Home</span>
        <span>Issues</span>
        <span>Major</span>
      </Navigation>
    )

    expect(wrapper.props().className.includes('breadcrumbs')).toEqual(true)
  })

  it('renders type tabs correctly', () => {
    const wrapper = shallow(
      <Navigation type='tabs'>
        <span>Home</span>
        <span>Issues</span>
        <span>Major</span>
      </Navigation>
    )

    expect(wrapper.props().className.includes('tabs')).toEqual(true)
  })

  it('renders dividers correctly', () => {
    const wrapper = shallow(
      <Navigation divider='/'>
        <span>Home</span>
        <span>Issues</span>
        <span>Major</span>
      </Navigation>
    )

    const secondChild = wrapper.childAt(1)
    expect(secondChild.props().className.includes('divider')).toEqual(true)
  })
})
