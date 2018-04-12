import React from 'react'
import { shallow, mount } from 'enzyme'

import Portal from '../src/Portal'

describe('<Portal />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Portal />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should correctly attach to body by default', () => {
    const wrapper = mount(<Portal />)
    const instance = wrapper.instance()

    expect(instance.el.parentNode).toEqual(document.body)
  })

  it('should correctly attach to different element', () => {
    const element = document.createElement('div')

    const wrapper = mount(<Portal attachTo={element} />)
    const instance = wrapper.instance()

    expect(instance.el.parentNode).toEqual(element)
    expect(element.childNodes.length).toEqual(1)

    wrapper.unmount()
  })

  it('should correctly switch element where it is attached', () => {
    const element = document.createElement('div')

    const wrapper = mount(<Portal attachTo={element} />)
    const instance = wrapper.instance()

    wrapper.setProps({ attachTo: undefined })

    expect(instance.el.parentNode).toEqual(document.body)

    wrapper.setProps({ attachTo: element })

    expect(instance.el.parentNode).toEqual(element)
    expect(element.childNodes.length).toEqual(1)

    wrapper.unmount()
  })

  it('should correctly detach on unmount', () => {
    const element = document.createElement('div')

    const wrapper = mount(<Portal attachTo={element} />)
    const instance = wrapper.instance()

    wrapper.unmount()

    expect(instance.el.parentNode).toEqual(null)
    expect(element.childNodes.length).toEqual(0)
  })
})
