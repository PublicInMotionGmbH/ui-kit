import React from 'react'
import { shallow, mount } from 'enzyme'

import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

import Calendar from '../src/Calendar'

describe('<Calendar />', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('renders children correctly', () => {
    const wrapper = mount(<Calendar />)

    expect(wrapper).toMatchSnapshot()

    wrapper.unmount()
  })

  it('should change the date correctly', () => {
    const wrapper = shallow(<Calendar />)

    const date = moment()

    wrapper.find(SingleDatePicker).props().onDateChange(date)

    expect(wrapper.state('date')).toEqual(date)
  })

  it('set placeholder correctly', () => {
    const wrapper = mount(<Calendar placeholder='This-is-placeholder' />)

    expect(wrapper.find('input').prop('placeholder')).toEqual('This-is-placeholder')

    wrapper.unmount()
  })

  it('should correctly work controlled from outside', () => {
    const wrapper = shallow(
      <Calendar
        value='2000-11-20'
      />
    )

    expect(wrapper.find(SingleDatePicker).prop('date').format('YYYY-MM-DD')).toEqual('2000-11-20')
  })

  it('should call onChange event', () => {
    const spy = jest.fn()

    const wrapper = shallow(
      <Calendar onChange={spy} />
    )

    // Change date
    wrapper.find(SingleDatePicker).props().onDateChange(moment('2000-11-20'))

    // Blur element
    wrapper.find(SingleDatePicker).props().onFocusChange({ focused: false })

    // Wait a while
    jest.runTimersToTime(1)

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0][0]).toBe('2000-11-20')
  })

  it('should call onFocus event', () => {
    const spy = jest.fn()

    const wrapper = shallow(
      <Calendar onFocus={spy} />
    )

    wrapper.find(SingleDatePicker).props().onFocusChange({ focused: true })

    expect(spy.mock.calls.length).toBe(1)
  })

  it('should call onBlur event', () => {
    const spy = jest.fn()

    const wrapper = shallow(
      <Calendar onBlur={spy} />
    )

    wrapper.find(SingleDatePicker).props().onFocusChange({ focused: false })

    expect(spy.mock.calls.length).toBe(1)
  })

  it('should correctly switch from self-controlled to controlled from outside', () => {
    const wrapper = shallow(
      <Calendar />
    )

    wrapper.setProps({ value: '2000-11-20' })

    expect(wrapper.find(SingleDatePicker).prop('date').format('YYYY-MM-DD')).toEqual('2000-11-20')
  })
})
