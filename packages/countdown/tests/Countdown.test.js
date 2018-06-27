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
    const wrapper = shallow(<Countdown targetDate={setDeadline(1000000000)} />)
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
  })
})
