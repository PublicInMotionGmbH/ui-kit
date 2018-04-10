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

    wrapper.children().forEach(node => {
      expect(node.props().typeClassName.includes('navigation')).toEqual(true)
    })
  })

  it('renders type pagination correctly', () => {
    const wrapper = shallow(
      <Navigation type='pagination'>
        <span>Home</span>
        <span>Issues</span>
        <span>Major</span>
      </Navigation>
    )

    wrapper.children().forEach(node => {
      expect(node.props().typeClassName.includes('pagination')).toEqual(true)
    })
  })

  it('renders type breadcrumbs correctly', () => {
    const wrapper = shallow(
      <Navigation type='breadcrumbs'>
        <span>Home</span>
        <span>Issues</span>
        <span>Major</span>
      </Navigation>
    )

    const firstChild = wrapper.childAt(0)
    const secondChild = wrapper.childAt(1)
    expect(firstChild.props().typeClassName.includes('breadcrumbs')).toEqual(true)
    expect(secondChild.props().className.includes('divider')).toEqual(true)
  })

  it('renders type tabs correctly', () => {
    const wrapper = shallow(
      <Navigation type='tabs'>
        <span>Home</span>
        <span>Issues</span>
        <span>Major</span>
      </Navigation>
    )

    wrapper.children().forEach(node => {
      expect(node.props().typeClassName.includes('tabs')).toEqual(true)
    })
  })
})
