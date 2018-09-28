import React from 'react'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import BasicCountdownRenderer from '../src/BasicCountdownRenderer'

const name = 'countdown'

describe('<BasicCountdownRenderer />', () => {
  it('should correctly build countdown for numbers < 10', () => {
    const wrapper = shallow(
      <BasicCountdownRenderer
        days={4}
        hours={3}
        minutes={6}
        seconds={2}
        finished={false}
      />
    )

    expect(wrapper.text()).toBe('04:03:06:02')
    expect(wrapper.find(`.${prefix(name, 'days')}`).text()).toBe('04')
    expect(wrapper.find(`.${prefix(name, 'hours')}`).text()).toBe('03')
    expect(wrapper.find(`.${prefix(name, 'minutes')}`).text()).toBe('06')
    expect(wrapper.find(`.${prefix(name, 'seconds')}`).text()).toBe('02')
  })

  it('should correctly build countdown for numbers >= 10', () => {
    const wrapper = shallow(
      <BasicCountdownRenderer
        days={14}
        hours={13}
        minutes={16}
        seconds={12}
        finished={false}
      />
    )

    expect(wrapper.text()).toBe('14:13:16:12')
    expect(wrapper.find(`.${prefix(name, 'days')}`).text()).toBe('14')
    expect(wrapper.find(`.${prefix(name, 'hours')}`).text()).toBe('13')
    expect(wrapper.find(`.${prefix(name, 'minutes')}`).text()).toBe('16')
    expect(wrapper.find(`.${prefix(name, 'seconds')}`).text()).toBe('12')
  })

  it('should correctly handle `finished` property', () => {
    const wrapper = shallow(
      <BasicCountdownRenderer
        days={0}
        hours={0}
        minutes={0}
        seconds={1}
        finished={false}
      />
    )

    expect(wrapper.text()).toBe('00:00:00:01')
    expect(wrapper.hasClass(`${prefix(name)}--finished`)).toBe(false)

    wrapper.setProps({
      seconds: 0,
      finished: true
    })

    expect(wrapper.text()).toBe('00:00:00:00')
    expect(wrapper.hasClass(`${prefix(name)}--finished`)).toBe(true)
  })
})
