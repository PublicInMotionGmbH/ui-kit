import React from 'react'
import { mount } from 'enzyme'

import CountryFlagsSprite from '../src/CountryFlagsSprite'

describe('<CountryFlagsSprite />', () => {
  it('should attach to body and detach later', () => {
    const body = document.body
    const children = body.children

    const previousChildren = children.length

    const wrapper = mount(<CountryFlagsSprite />)

    expect(children.length).toBe(previousChildren + 1)

    wrapper.unmount()

    expect(children.length).toBe(previousChildren)
  })

  it('should attach just once for many components', () => {
    const body = document.body
    const children = body.children

    const previousChildren = children.length

    const wrapper = mount(<CountryFlagsSprite />)
    const wrapper2 = mount(<CountryFlagsSprite />)

    expect(children.length).toBe(previousChildren + 1)

    wrapper.unmount()
    wrapper2.unmount()

    expect(children.length).toBe(previousChildren)
  })

  it('should attach stay in DOM when there is still one sprite', () => {
    const body = document.body
    const children = body.children

    const previousChildren = children.length

    const wrapper = mount(<CountryFlagsSprite />)
    const wrapper2 = mount(<CountryFlagsSprite />)

    wrapper.unmount()

    expect(children.length).toBe(previousChildren + 1)

    wrapper2.unmount()

    expect(children.length).toBe(previousChildren)
  })

  it('should attach SVG to DOM tree', () => {
    const body = document.body

    const previousSvgs = body.querySelectorAll('svg').length

    const wrapper = mount(<CountryFlagsSprite />)

    const nextSvgs = body.querySelectorAll('svg').length

    expect(nextSvgs).toBe(previousSvgs + 1)

    wrapper.unmount()
  })
})
