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
    const wrapper = shallow(<Countdown targetDate={setDeadline(0)} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('adds class when finished', () => {
    const wrapper = shallow(<Countdown targetDate={setDeadline(0)} />)
    expect(wrapper.find('.talixo-countdown').at(0).hasClass('talixo-countdown--finished')).toBe(true)
  })

  it('update component when new props are differents', () => {
    const wrapper = mount(<Countdown targetDate='2040-06-27T10:52:07.997Z' />)
    wrapper.setProps({
      targetDate: '2050-10-27T10:52:07.997Z'
    })
    expect(wrapper.prop('targetDate')).toBe('2050-10-27T10:52:07.997Z')

    wrapper.unmount()
  })

  it('changes value to "00" when number is NaN', () => {
    const wrapper = mount(<Countdown targetDate='2040-06-27T10:52:07.997Z' />)
    wrapper.setState({
      time: 'undefind'
    })

    expect(wrapper.find('Countdown').text()).toBe('00 : 00 : 00 : 00 ')

    wrapper.unmount()
  })

  it('it calls clearTimeout before unmount', () => {
    const globalTimeout = global.clearTimeout
    const spy = jest.fn()
    global.clearTimeout = spy

    const wrapper = mount(<Countdown targetDate='2040-06-27T10:52:07.997Z' />)

    wrapper.instance().componentWillUnmount()

    expect(spy.mock.calls.length).toBe(2)

    wrapper.unmount()

    global.clearTimeout = globalTimeout
  })
})
