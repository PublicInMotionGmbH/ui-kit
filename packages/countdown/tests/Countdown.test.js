import React from 'react'
import { shallow } from 'enzyme'

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
})
