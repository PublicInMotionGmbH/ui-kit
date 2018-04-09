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

    wrapper.children().forEach(node => {
      expect(node.props().typeClassName.includes('breadcrumbs')).toEqual(true)
    })
    expect(wrapper.children().first().props().divider).toEqual('/')
    expect(wrapper.children().last().props().divider).toEqual(null)
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
