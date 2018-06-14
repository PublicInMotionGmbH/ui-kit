import React from 'react'
import { mount } from 'enzyme'

import SpyScroll from '../src/SpyScroll'

jest.mock('react-dom', () => ({
  findDOMNode: n => n
}))

const createSpyWrapper = (props, childprops, style) => mount(<SpyScroll {...props}>
  <span className='spied-element' style={style} {...childprops}>
    Hello
  </span>
</SpyScroll>)

const createBoundingRect = (height, top, bottom) => {
  window.Element.prototype.getBoundingClientRect = jest.fn(() => {
    return {
      height,
      top,
      bottom
    }
  })
}

const innerHeight = window.innerHeight

describe('<SpyScroll />', () => {
  let wrapper
  beforeEach(() => {
    createBoundingRect(100, 50, 50)
  })
  it('renders correctly', () => {
    wrapper = createSpyWrapper()

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('passes ref correctly', () => {
    const wrapper = createSpyWrapper()

    const element = wrapper.find('span')
    wrapper.instance().setRef(element)

    expect(wrapper.instance()._element).toEqual(element)
    wrapper.unmount()
  })

  it('composes ref correctly', () => {
    const spy = jest.fn()
    const wrapper = createSpyWrapper(null, { ref: spy })

    const element = wrapper.find('span')
    wrapper.instance().setRef(element)

    expect(spy).toHaveBeenCalled()
    wrapper.unmount()
  })
})

describe('update position', () => {
  it('updates position correctly when element is inside', () => {
    createBoundingRect(50, 50, 100)
    window.innerHeight = 200

    const wrapper = createSpyWrapper()

    expect(wrapper.state().over).toEqual(false)
    expect(wrapper.state().top).toEqual(false)
    expect(wrapper.state().bottom).toEqual(false)
    expect(wrapper.state().under).toEqual(false)
    expect(wrapper.state().visible).toEqual(true)

    wrapper.unmount()
    window.innerHeight = innerHeight
  })

  it('updates position correctly when element is inside and is bigger than half of the viewport', () => {
    createBoundingRect(50, 50, 100)
    window.innerHeight = 200

    const wrapper = createSpyWrapper()

    expect(wrapper.state().over).toEqual(false)
    expect(wrapper.state().top).toEqual(false)
    expect(wrapper.state().bottom).toEqual(false)
    expect(wrapper.state().under).toEqual(false)
    expect(wrapper.state().visible).toEqual(true)

    wrapper.unmount()
    window.innerHeight = innerHeight
  })

  it('updates position correctly when element is under', () => {
    createBoundingRect(50, 51, 101)
    window.innerHeight = 50

    const wrapper = createSpyWrapper()

    expect(wrapper.state().over).toEqual(false)
    expect(wrapper.state().top).toEqual(false)
    expect(wrapper.state().bottom).toEqual(true)
    expect(wrapper.state().under).toEqual(true)
    expect(wrapper.state().visible).toEqual(false)

    wrapper.unmount()
    window.innerHeight = innerHeight
  })

  it('updates position correctly when element on the bottom', () => {
    createBoundingRect(40, 40, 80)
    window.innerHeight = 50

    const wrapper = createSpyWrapper()

    expect(wrapper.state().over).toEqual(false)
    expect(wrapper.state().top).toEqual(false)
    expect(wrapper.state().bottom).toEqual(true)
    expect(wrapper.state().under).toEqual(false)
    expect(wrapper.state().visible).toEqual(false)

    wrapper.unmount()
    window.innerHeight = innerHeight
  })

  it('updates position correctly when element is over', () => {
    createBoundingRect(50, -51, -1)
    window.innerHeight = 50

    const wrapper = createSpyWrapper()

    expect(wrapper.state().over).toEqual(true)
    expect(wrapper.state().top).toEqual(true)
    expect(wrapper.state().bottom).toEqual(false)
    expect(wrapper.state().under).toEqual(false)
    expect(wrapper.state().visible).toEqual(false)

    wrapper.unmount()
    window.innerHeight = innerHeight
  })

  it('updates position correctly when element is on the top', () => {
    createBoundingRect(50, -51, -1)
    window.innerHeight = 50

    const wrapper = createSpyWrapper()

    expect(wrapper.state().over).toEqual(true)
    expect(wrapper.state().top).toEqual(true)
    expect(wrapper.state().bottom).toEqual(false)
    expect(wrapper.state().under).toEqual(false)
    expect(wrapper.state().visible).toEqual(false)

    wrapper.unmount()
    window.innerHeight = innerHeight
  })
})

describe('triggers on scroll down', () => {
  let wrapper
  beforeEach(() => {
    createBoundingRect(50, 125, 175)
    window.innerHeight = 100
  })
  afterEach(() => {
    wrapper.unmount()
  })
  it('triggers onVisible', () => {
    const onVisible = jest.fn()
    wrapper = createSpyWrapper({ onVisible })
    wrapper.setState({ visible: true })

    expect(onVisible).toHaveBeenCalledTimes(1)
  })

  it('triggers onBeginningVisible', () => {
    const onBeginningVisible = jest.fn()
    wrapper = createSpyWrapper({ onBeginningVisible })
    wrapper.setState({ bottom: false })

    expect(onBeginningVisible).toHaveBeenCalledTimes(1)
  })

  it('triggers onEndReached', () => {
    const onEndReached = jest.fn()
    wrapper = createSpyWrapper({ onEndReached })
    wrapper.setState({ top: true })

    expect(onEndReached).toHaveBeenCalledTimes(1)
  })

  it('triggers onEndLost', () => {
    const onEndLost = jest.fn()
    wrapper = createSpyWrapper({ onEndLost })
    wrapper.setState({ over: true })

    expect(onEndLost).toHaveBeenCalledTimes(1)
  })

  it('triggers onBeginningAppeared', () => {
    const onBeginningAppeared = jest.fn()
    wrapper = createSpyWrapper({ onBeginningAppeared })
    wrapper.setState({ under: false })

    expect(onBeginningAppeared).toHaveBeenCalledTimes(1)
  })
})

describe('triggers on scroll up', () => {
  let wrapper
  beforeEach(() => {
    createBoundingRect(50, -75, -25)
    window.innerHeight = 100
  })
  afterEach(() => {
    wrapper.unmount()
  })
  it('triggers onVisible', () => {
    const onVisible = jest.fn()
    wrapper = createSpyWrapper({ onVisible })
    wrapper.setState({ visible: true })

    expect(onVisible).toHaveBeenCalledTimes(1)
  })

  it('triggers onBeginningReached', () => {
    const onBeginningReached = jest.fn()
    wrapper = createSpyWrapper({ onBeginningReached })
    wrapper.setState({ bottom: true })

    expect(onBeginningReached).toHaveBeenCalledTimes(1)
  })

  it('triggers onEndVisible', () => {
    const onEndVisible = jest.fn()
    wrapper = createSpyWrapper({ onEndVisible })
    wrapper.setState({ top: false })

    expect(onEndVisible).toHaveBeenCalledTimes(1)
  })

  it('triggers onEndAppeared', () => {
    const onEndAppeared = jest.fn()
    wrapper = createSpyWrapper({ onEndAppeared })
    wrapper.setState({ over: false })

    expect(onEndAppeared).toHaveBeenCalledTimes(1)
  })

  it('triggers onBeginningLost', () => {
    const onBeginningLost = jest.fn()
    wrapper = createSpyWrapper({ onBeginningLost })
    wrapper.setState({ under: true })

    expect(onBeginningLost).toHaveBeenCalledTimes(1)
  })
})
