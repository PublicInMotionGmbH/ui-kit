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

const createBoundingRect = (height, top, bottom, width, left, right) => {
  window.Element.prototype.getBoundingClientRect = jest.fn(() => {
    return {
      height,
      top,
      bottom,
      width,
      left,
      right
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

    expect(wrapper.state().ahead).toEqual(false)
    expect(wrapper.state().end).toEqual(false)
    expect(wrapper.state().beginning).toEqual(false)
    expect(wrapper.state().behind).toEqual(false)
    expect(wrapper.state().visible).toEqual(true)

    wrapper.unmount()
    window.innerHeight = innerHeight
  })

  it('updates position correctly when element is inside and is bigger than half of the viewport', () => {
    createBoundingRect(50, 50, 100)
    window.innerHeight = 200

    const wrapper = createSpyWrapper()

    expect(wrapper.state().ahead).toEqual(false)
    expect(wrapper.state().end).toEqual(false)
    expect(wrapper.state().beginning).toEqual(false)
    expect(wrapper.state().behind).toEqual(false)
    expect(wrapper.state().visible).toEqual(true)

    wrapper.unmount()
    window.innerHeight = innerHeight
  })

  it('updates position correctly when element is behind', () => {
    createBoundingRect(50, 51, 101)
    window.innerHeight = 50

    const wrapper = createSpyWrapper()

    expect(wrapper.state().ahead).toEqual(false)
    expect(wrapper.state().end).toEqual(false)
    expect(wrapper.state().beginning).toEqual(true)
    expect(wrapper.state().behind).toEqual(true)
    expect(wrapper.state().visible).toEqual(false)

    wrapper.unmount()
    window.innerHeight = innerHeight
  })

  it('updates position correctly when element on the beginning', () => {
    createBoundingRect(40, 40, 80)
    window.innerHeight = 50

    const wrapper = createSpyWrapper()

    expect(wrapper.state().ahead).toEqual(false)
    expect(wrapper.state().end).toEqual(false)
    expect(wrapper.state().beginning).toEqual(true)
    expect(wrapper.state().behind).toEqual(false)
    expect(wrapper.state().visible).toEqual(false)

    wrapper.unmount()
    window.innerHeight = innerHeight
  })

  it('updates position correctly when element is ahead', () => {
    createBoundingRect(50, -51, -1)
    window.innerHeight = 50

    const wrapper = createSpyWrapper()

    expect(wrapper.state().ahead).toEqual(true)
    expect(wrapper.state().end).toEqual(true)
    expect(wrapper.state().beginning).toEqual(false)
    expect(wrapper.state().behind).toEqual(false)
    expect(wrapper.state().visible).toEqual(false)

    wrapper.unmount()
    window.innerHeight = innerHeight
  })

  it('updates position correctly when element is on the end', () => {
    createBoundingRect(50, -51, -1)
    window.innerHeight = 50

    const wrapper = createSpyWrapper()

    expect(wrapper.state().ahead).toEqual(true)
    expect(wrapper.state().end).toEqual(true)
    expect(wrapper.state().beginning).toEqual(false)
    expect(wrapper.state().behind).toEqual(false)
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

  it('triggers with container', () => {
    const onVisible = jest.fn()
    const containerId = 'trigger'

    const div = document.createElement('div')
    document.body.appendChild(div)
    div.id = containerId

    div.getBoundingClientRect = jest.fn(() => {
      return {
        height: 80,
        top: 10
      }
    })

    wrapper = mount(<SpyScroll containerId={containerId} onVisible={onVisible}>
      <span className='spied-element'>
        Hello
      </span>
    </SpyScroll>, { attachTo: div })

    wrapper.setState({ visible: true })

    expect(onVisible).toHaveBeenCalledTimes(1)
    document.body.removeChild(div)
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
    wrapper.setState({ beginning: false })

    expect(onBeginningVisible).toHaveBeenCalledTimes(1)
  })

  it('triggers onBeginningFinish', () => {
    const onBeginningFinish = jest.fn()
    wrapper = createSpyWrapper({ onBeginningFinish })
    wrapper.setState({ end: true })

    expect(onBeginningFinish).toHaveBeenCalledTimes(1)
  })

  it('triggers onBeginningLost', () => {
    const onBeginningLost = jest.fn()
    wrapper = createSpyWrapper({ onBeginningLost })
    wrapper.setState({ ahead: true })

    expect(onBeginningLost).toHaveBeenCalledTimes(1)
  })

  it('triggers onBeginningStart', () => {
    const onBeginningStart = jest.fn()
    wrapper = createSpyWrapper({ onBeginningStart })
    wrapper.setState({ behind: false })

    expect(onBeginningStart).toHaveBeenCalledTimes(1)
  })

  it('triggers onTriggerReached', () => {
    const onTriggerReached = jest.fn()
    const triggerId = 'trigger'

    const div = document.createElement('div')
    document.body.appendChild(div)

    const trigger = document.createElement('span')
    document.body.appendChild(trigger)
    trigger.id = triggerId
    trigger.getBoundingClientRect = jest.fn(() => {
      return {
        top: 50,
        left: 50
      }
    })

    wrapper = mount(<SpyScroll triggerId={triggerId} onTriggerReached={onTriggerReached}>
      <span className='spied-element'>
        Hello
      </span>
    </SpyScroll>, { attachTo: div })

    wrapper.setState({ triggered: true })

    expect(onTriggerReached).toHaveBeenCalledTimes(1)
    document.body.removeChild(div)
    document.body.removeChild(trigger)
    wrapper.detach()
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

  it('triggers onDisappearing', () => {
    const onDisappearing = jest.fn()
    createBoundingRect(50, 0, 50)
    wrapper = createSpyWrapper({ onDisappearing })
    wrapper.setState({ visible: false })

    expect(onDisappearing).toHaveBeenCalledTimes(1)
  })

  it('triggers onEndFinish', () => {
    const onEndFinish = jest.fn()
    wrapper = createSpyWrapper({ onEndFinish })
    wrapper.setState({ beginning: true })

    expect(onEndFinish).toHaveBeenCalledTimes(1)
  })

  it('triggers onEndVisible', () => {
    const onEndVisible = jest.fn()
    wrapper = createSpyWrapper({ onEndVisible })
    wrapper.setState({ end: false })

    expect(onEndVisible).toHaveBeenCalledTimes(1)
  })

  it('triggers onEndStart', () => {
    const onEndStart = jest.fn()
    wrapper = createSpyWrapper({ onEndStart })
    wrapper.setState({ ahead: false })

    expect(onEndStart).toHaveBeenCalledTimes(1)
  })

  it('triggers onEndLost', () => {
    const onEndLost = jest.fn()
    wrapper = createSpyWrapper({ onEndLost })
    wrapper.setState({ behind: true })

    expect(onEndLost).toHaveBeenCalledTimes(1)
  })

  it('triggers onTriggerRetreats', () => {
    const onTriggerRetreats = jest.fn()
    const triggerId = 'trigger'

    const div = document.createElement('div')
    document.body.appendChild(div)

    const trigger = document.createElement('span')
    document.body.appendChild(trigger)
    trigger.id = triggerId
    trigger.getBoundingClientRect = jest.fn(() => {
      return {
        top: 50,
        left: 50
      }
    })

    wrapper = mount(<SpyScroll triggerId={triggerId} onTriggerRetreats={onTriggerRetreats}>
      <span className='spied-element'>
        Hello
      </span>
    </SpyScroll>, { attachTo: div })

    wrapper.setState({ triggered: false })

    expect(onTriggerRetreats).toHaveBeenCalledTimes(1)
    document.body.removeChild(div)
    document.body.removeChild(trigger)
    wrapper.detach()
  })
})

describe('triggers on scroll right', () => {
  let wrapper
  beforeEach(() => {
    createBoundingRect(50, 25, 75, 40, 120, 160)
    window.innerHeight = 100
    window.innerWidth = 100
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('triggers with container', () => {
    const onVisible = jest.fn()
    const containerId = 'trigger'

    const div = document.createElement('div')
    document.body.appendChild(div)
    div.id = containerId

    div.getBoundingClientRect = jest.fn(() => {
      return {
        width: 80,
        height: 80,
        left: 10,
        right: 10
      }
    })

    wrapper = mount(<SpyScroll horizontal containerId={containerId} onVisible={onVisible}>
      <span className='spied-element'>
        Hello
      </span>
    </SpyScroll>, { attachTo: div })
    expect(wrapper.instance()._container.getBoundingClientRect().left).toEqual(10)
    expect(wrapper.state().visible).toEqual(false)

    wrapper.setState({ visible: true })

    expect(onVisible).toHaveBeenCalledTimes(1)
    document.body.removeChild(div)
  })

  it('triggers onVisible', () => {
    const onVisible = jest.fn()
    wrapper = createSpyWrapper({ horizontal: true, onVisible })
    wrapper.setState({ visible: true })

    expect(onVisible).toHaveBeenCalledTimes(1)
  })

  it('triggers onBeginningVisible', () => {
    const onBeginningVisible = jest.fn()
    wrapper = createSpyWrapper({ horizontal: true, onBeginningVisible })
    wrapper.setState({ beginning: false })

    expect(onBeginningVisible).toHaveBeenCalledTimes(1)
  })

  it('triggers onBeginningFinish', () => {
    const onBeginningFinish = jest.fn()
    wrapper = createSpyWrapper({ horizontal: true, onBeginningFinish })
    wrapper.setState({ end: true })

    expect(onBeginningFinish).toHaveBeenCalledTimes(1)
  })

  it('triggers onBeginningLost', () => {
    const onBeginningLost = jest.fn()
    wrapper = createSpyWrapper({ horizontal: true, onBeginningLost })
    wrapper.setState({ ahead: true })

    expect(onBeginningLost).toHaveBeenCalledTimes(1)
  })

  it('triggers onBeginningStart', () => {
    const onBeginningStart = jest.fn()
    wrapper = createSpyWrapper({ horizontal: true, onBeginningStart })
    wrapper.setState({ behind: false })

    expect(onBeginningStart).toHaveBeenCalledTimes(1)
  })

  it('triggers onTriggerReached', () => {
    const onTriggerReached = jest.fn()
    const triggerId = 'trigger'

    const div = document.createElement('div')
    document.body.appendChild(div)

    const trigger = document.createElement('span')
    document.body.appendChild(trigger)
    trigger.id = triggerId
    trigger.getBoundingClientRect = jest.fn(() => {
      return {
        top: 50,
        left: 50
      }
    })

    wrapper = mount(<SpyScroll horizontal triggerId={triggerId} onTriggerReached={onTriggerReached}>
      <span className='spied-element'>
        Hello
      </span>
    </SpyScroll>, { attachTo: div })

    wrapper.setState({ triggered: true })

    expect(onTriggerReached).toHaveBeenCalledTimes(1)
    document.body.removeChild(div)
    document.body.removeChild(trigger)
    wrapper.detach()
  })
})

describe('triggers on scroll left', () => {
  let wrapper
  beforeEach(() => {
    createBoundingRect(50, 25, 75, 50, -75, -25)
    window.innerHeight = 100
    window.innerWidth = 100
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('triggers onDisappearing', () => {
    const onDisappearing = jest.fn()
    createBoundingRect(50, 0, 50, 50, 0, 50)
    wrapper = createSpyWrapper({ horizontal: true, onDisappearing })
    wrapper.setState({ visible: false })

    expect(onDisappearing).toHaveBeenCalledTimes(1)
  })

  it('triggers onEndFinish', () => {
    const onEndFinish = jest.fn()
    wrapper = createSpyWrapper({ horizontal: true, onEndFinish })
    wrapper.setState({ beginning: true })

    expect(onEndFinish).toHaveBeenCalledTimes(1)
  })

  it('triggers onEndVisible', () => {
    const onEndVisible = jest.fn()
    wrapper = createSpyWrapper({ horizontal: true, onEndVisible })
    wrapper.setState({ end: false })

    expect(onEndVisible).toHaveBeenCalledTimes(1)
  })

  it('triggers onEndStart', () => {
    const onEndStart = jest.fn()
    wrapper = createSpyWrapper({ horizontal: true, onEndStart })
    wrapper.setState({ ahead: false })

    expect(onEndStart).toHaveBeenCalledTimes(1)
  })

  it('triggers onEndLost', () => {
    const onEndLost = jest.fn()
    wrapper = createSpyWrapper({ horizontal: true, onEndLost })
    wrapper.setState({ behind: true })

    expect(onEndLost).toHaveBeenCalledTimes(1)
  })

  it('triggers onTriggerRetreats', () => {
    const onTriggerRetreats = jest.fn()
    const triggerId = 'trigger'

    const div = document.createElement('div')
    document.body.appendChild(div)

    const trigger = document.createElement('span')
    document.body.appendChild(trigger)
    trigger.id = triggerId
    trigger.getBoundingClientRect = jest.fn(() => {
      return {
        top: 50,
        left: 50
      }
    })

    wrapper = mount(<SpyScroll horizontal triggerId={triggerId} onTriggerRetreats={onTriggerRetreats}>
      <span className='spied-element'>
        Hello
      </span>
    </SpyScroll>, { attachTo: div })

    wrapper.setState({ triggered: false })

    expect(onTriggerRetreats).toHaveBeenCalledTimes(1)
    document.body.removeChild(div)
    document.body.removeChild(trigger)
    wrapper.detach()
  })
})

describe('range', () => {
  let wrapper
  beforeEach(() => {
    window.innerHeight = 100
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('triggers onRangeLeft', () => {
    createBoundingRect(50, 25, 75, 50, -75, -25)
    const onRangeLeft = jest.fn()
    const range = ['range-start', 'range-end']

    const div = document.createElement('div')
    document.body.appendChild(div)

    const rangeStart = document.createElement('span')
    document.body.appendChild(rangeStart)
    rangeStart.id = range[0]
    rangeStart.getBoundingClientRect = jest.fn(() => {
      return {
        top: 25
      }
    })

    const rangeEnd = document.createElement('span')
    document.body.appendChild(rangeEnd)
    rangeEnd.id = range[1]
    rangeEnd.getBoundingClientRect = jest.fn(() => {
      return {
        top: 75
      }
    })

    wrapper = mount(<SpyScroll range={range} onRangeLeft={onRangeLeft}>
      <span className='spied-element'>
        Hello
      </span>
    </SpyScroll>, { attachTo: div })

    wrapper.setState({ inRange: false })

    expect(onRangeLeft).toHaveBeenCalledTimes(1)
    document.body.removeChild(div)
    document.body.removeChild(rangeStart)
    document.body.removeChild(rangeEnd)
    wrapper.detach()
  })

  it('triggers onRangeEntered', () => {
    createBoundingRect(50, -75, -25, 50, -75, -25)
    const onRangeEntered = jest.fn()
    const range = ['range-start', 'range-end']

    const div = document.createElement('div')
    document.body.appendChild(div)

    const rangeStart = document.createElement('span')
    document.body.appendChild(rangeStart)
    rangeStart.id = range[0]
    rangeStart.getBoundingClientRect = jest.fn(() => {
      return {
        top: 25
      }
    })

    const rangeEnd = document.createElement('span')
    document.body.appendChild(rangeEnd)
    rangeEnd.id = range[1]
    rangeEnd.getBoundingClientRect = jest.fn(() => {
      return {
        top: 75
      }
    })

    wrapper = mount(<SpyScroll range={range} onRangeEntered={onRangeEntered}>
      <span className='spied-element'>
        Hello
      </span>
    </SpyScroll>, { attachTo: div })

    wrapper.setState({ inRange: true })

    expect(onRangeEntered).toHaveBeenCalledTimes(1)
    document.body.removeChild(div)
    document.body.removeChild(rangeStart)
    document.body.removeChild(rangeEnd)
    wrapper.detach()
  })
})
