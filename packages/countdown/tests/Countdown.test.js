import React from 'react'
import { shallow, mount } from 'enzyme'

import Countdown from '../src/Countdown'

const time = Date.parse('2018-01-05T10:30:00Z')

/**
 * Get time in the future.
 *
 * @param {number} addTime
 * @returns {string}
 */
function getFutureTime (addTime) {
  const deadline = time + addTime

  return new Date(deadline).toISOString()
}

const DateNow = Date.now

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function mockTime (add) {
  Date.now = () => time + (add || 0)
}

function unmockTime () {
  Date.now = DateNow
}

function CustomRenderer () {
  return <div id='custom' />
}

describe('<Countdown />', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  beforeEach(() => mockTime())
  afterEach(() => unmockTime())

  it('renders children correctly', () => {
    const wrapper = shallow(<Countdown targetDate={getFutureTime(0)} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should use custom renderer', () => {
    const wrapper = shallow(
      <Countdown
        render={CustomRenderer}
        targetDate={getFutureTime(0)}
      />
    )

    expect(wrapper.find(CustomRenderer).length).toBe(1)
  })

  it('should calculate date correctly', () => {
    const time = getFutureTime(5 * MINUTE + 3 * SECOND)
    const longTime = getFutureTime(2 * HOUR + 5 * MINUTE)
    const longerTime = getFutureTime(1 * DAY + 5 * MINUTE + 10 * SECOND)

    const wrapper = shallow(<Countdown targetDate={time} />)

    expect(wrapper.prop('seconds')).toBe(3)
    expect(wrapper.prop('minutes')).toBe(5)
    expect(wrapper.prop('hours')).toBe(0)
    expect(wrapper.prop('days')).toBe(0)

    wrapper.setProps({ targetDate: longTime })

    expect(wrapper.prop('seconds')).toBe(0)
    expect(wrapper.prop('minutes')).toBe(5)
    expect(wrapper.prop('hours')).toBe(2)
    expect(wrapper.prop('days')).toBe(0)

    wrapper.setProps({ targetDate: longerTime })

    expect(wrapper.prop('seconds')).toBe(10)
    expect(wrapper.prop('minutes')).toBe(5)
    expect(wrapper.prop('hours')).toBe(0)
    expect(wrapper.prop('days')).toBe(1)
  })

  it('should calculate date correctly', () => {
    const time = getFutureTime(5 * MINUTE + 3 * SECOND)
    const longTime = getFutureTime(2 * HOUR + 5 * MINUTE)
    const longerTime = getFutureTime(1 * DAY + 5 * MINUTE + 10 * SECOND)

    const wrapper = shallow(<Countdown targetDate={time} />)

    expect(wrapper.prop('seconds')).toBe(3)
    expect(wrapper.prop('minutes')).toBe(5)
    expect(wrapper.prop('hours')).toBe(0)
    expect(wrapper.prop('days')).toBe(0)

    wrapper.setProps({ targetDate: longTime })

    expect(wrapper.prop('seconds')).toBe(0)
    expect(wrapper.prop('minutes')).toBe(5)
    expect(wrapper.prop('hours')).toBe(2)
    expect(wrapper.prop('days')).toBe(0)

    wrapper.setProps({ targetDate: longerTime })

    expect(wrapper.prop('seconds')).toBe(10)
    expect(wrapper.prop('minutes')).toBe(5)
    expect(wrapper.prop('hours')).toBe(0)
    expect(wrapper.prop('days')).toBe(1)
  })

  it('should update countdown in some time', () => {
    const diff = 5 * MINUTE + 3 * SECOND
    const time = getFutureTime(diff)

    const wrapper = mount(<Countdown targetDate={time} />)

    expect(wrapper.state('time')).toBe(diff)

    mockTime(SECOND)
    jest.runTimersToTime(SECOND)

    expect(wrapper.state('time')).toBe(diff - SECOND)
  })

  it('should stop ticking when component is unmounted', () => {
    const diff = 5 * MINUTE + 3 * SECOND
    const time = getFutureTime(diff)

    const wrapper = mount(<Countdown targetDate={time} />)
    const instance = wrapper.instance()

    expect(instance.state.time).toBe(diff)

    wrapper.unmount()

    mockTime(SECOND)
    jest.runTimersToTime(SECOND)

    expect(instance.state.time).toBe(diff)
  })

  it('should correctly pass `finished` property', () => {
    const start = 5 * MINUTE + 2 * SECOND
    const middle = start + 0.5 * SECOND
    const end = middle + 0.5 * SECOND

    const target = getFutureTime(end)

    const wrapper = mount(<Countdown targetDate={target} />)

    wrapper.update()
    expect(wrapper.children().prop('finished')).toBe(false)

    mockTime(start)
    jest.runTimersToTime(start)

    wrapper.update()
    expect(wrapper.children().prop('finished')).toBe(false)

    mockTime(middle)
    jest.runTimersToTime(middle - start)

    wrapper.update()
    expect(wrapper.children().prop('finished')).toBe(false)

    mockTime(end)
    jest.runTimersToTime(end - middle)

    wrapper.update()
    expect(wrapper.children().prop('finished')).toBe(true)

    mockTime(end + 1000)
    jest.runTimersToTime(1000)

    wrapper.update()
    expect(wrapper.children().prop('finished')).toBe(true)
  })

  it('should floor value', () => {
    const start = 5 * MINUTE + 2 * SECOND
    const middle = start + 0.5 * SECOND
    const end = middle + 0.5 * SECOND

    const target = getFutureTime(end)

    const wrapper = mount(<Countdown targetDate={target} />)

    wrapper.update()
    expect(wrapper.children().prop('seconds')).toBe(3)
    expect(wrapper.children().prop('minutes')).toBe(5)
    expect(wrapper.children().prop('hours')).toBe(0)
    expect(wrapper.children().prop('days')).toBe(0)

    mockTime(start)
    jest.runTimersToTime(start)

    wrapper.update()
    expect(wrapper.children().prop('seconds')).toBe(1)
    expect(wrapper.children().prop('minutes')).toBe(0)
    expect(wrapper.children().prop('hours')).toBe(0)
    expect(wrapper.children().prop('days')).toBe(0)

    mockTime(middle)
    jest.runTimersToTime(middle - start)

    wrapper.update()
    expect(wrapper.children().prop('seconds')).toBe(0)
    expect(wrapper.children().prop('minutes')).toBe(0)
    expect(wrapper.children().prop('hours')).toBe(0)
    expect(wrapper.children().prop('days')).toBe(0)

    mockTime(end)
    jest.runTimersToTime(end - middle)

    wrapper.update()
    expect(wrapper.children().prop('seconds')).toBe(0)
    expect(wrapper.children().prop('minutes')).toBe(0)
    expect(wrapper.children().prop('hours')).toBe(0)
    expect(wrapper.children().prop('days')).toBe(0)
  })

  it('should be still 0 for past date', () => {
    const target = getFutureTime(-2 * DAY)

    const wrapper = shallow(<Countdown targetDate={target} />)

    wrapper.update()
    expect(wrapper.prop('seconds')).toBe(0)
    expect(wrapper.prop('minutes')).toBe(0)
    expect(wrapper.prop('hours')).toBe(0)
    expect(wrapper.prop('days')).toBe(0)
  })
})
