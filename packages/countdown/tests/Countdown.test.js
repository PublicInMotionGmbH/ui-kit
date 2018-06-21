import React from 'react'
import { shallow, mount } from 'enzyme'

import Countdown from '../src/Countdown'

// mock deadline in the future according to actual date
const setDeadline = (addTime) => {
  const dateNow = Date.now()
  const deadline = dateNow + addTime
  const deadlineConverted = new Date(deadline).toISOString()

  return deadlineConverted
}

describe('<Countdown />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Countdown targetDate='2019-12-04T00:00:00+00:00' />)
    expect(wrapper).toMatchSnapshot()
  })

  it('sets remaining date in state after mount component ', async () => {
    const wrapper = mount(<Countdown targetDate={setDeadline(190000000)} />)

    expect(wrapper.state('sec')).toEqual(0)

    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })

    expect(wrapper.state('days')).toEqual(2)
    expect(wrapper.state('hours')).toEqual(4)
    expect(wrapper.state('min')).toEqual(46)
    expect(wrapper.state('sec')).toEqual(39)
  })

  it('render properly default', async () => {
    const wrapper = mount(<Countdown targetDate={setDeadline(0)} />)

    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
    expect(wrapper.find('span').at(0).text()).toBe('00 : 00 : 00 : 00 ')
  })

  it('render properly custom format', async () => {
    const wrapper = mount(<Countdown format='dd days hh hours mm minutes ss seconds' targetDate={setDeadline(0)} />)

    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })

    expect(wrapper.find('span').at(0).text()).toBe('00 days 00 hours 00 minutes 00 seconds')
  })

  it('not render optional when value equal to 0', async () => {
    const wrapper = mount(<Countdown format='[dd days] hh hours mm minutes ss seconds' targetDate={setDeadline(80000000)} />)

    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })

    expect(wrapper.state('days')).toEqual(0)
    expect(wrapper.find('span').at(1).text()).not.toBe('00 ')
  })

  it('changes value 0 and below into string 00', async () => {
    const wrapper = mount(<Countdown format='dd days hh hours mm minutes ss seconds' targetDate={setDeadline(80000000)} />)

    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })

    expect(wrapper.state('days')).toEqual(0)
    expect(wrapper.find('span').at(1).text()).toBe('00 ')
  })
})
