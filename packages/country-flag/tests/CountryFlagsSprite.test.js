import React from 'react'
import { mount } from 'enzyme'

import CountryFlagsProvider from '../src/CountryFlagsSprite'

describe('<CountryFlagsSprite />', () => {
  it('should attach to body and detach later', () => {
    const body = document.body
    const children = body.children

    const previousChildren = children.length

    const wrapper = mount(<CountryFlagsProvider />)

    expect(children.length).toBe(previousChildren + 1)

    wrapper.unmount()

    expect(children.length).toBe(previousChildren)
  })

  it('should attach just once for many components', () => {
    const body = document.body
    const children = body.children

    const previousChildren = children.length

    const wrapper = mount(<CountryFlagsProvider />)
    const wrapper2 = mount(<CountryFlagsProvider />)

    expect(children.length).toBe(previousChildren + 1)

    wrapper.unmount()
    wrapper2.unmount()

    expect(children.length).toBe(previousChildren)
  })

  it('should attach stay in DOM when there is still one sprite', () => {
    const body = document.body
    const children = body.children

    const previousChildren = children.length

    const wrapper = mount(<CountryFlagsProvider />)
    const wrapper2 = mount(<CountryFlagsProvider />)

    wrapper.unmount()

    expect(children.length).toBe(previousChildren + 1)

    wrapper2.unmount()

    expect(children.length).toBe(previousChildren)
  })

  it('should attach SVG to DOM tree', () => {
    const body = document.body

    const previousSvgs = body.querySelectorAll('svg').length

    const wrapper = mount(<CountryFlagsProvider />)

    const nextSvgs = body.querySelectorAll('svg').length

    expect(nextSvgs).toBe(previousSvgs + 1)

    wrapper.unmount()
  })
})
