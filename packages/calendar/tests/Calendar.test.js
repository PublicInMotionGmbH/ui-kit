import React from 'react'
import { shallow, mount } from 'enzyme'

import Calendar from '../src/Calendar'

import moment from 'moment'

describe('<Calendar />', () => {
  it('renders children correctly', () => {
    const wrapper = mount(<Calendar />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should change the date correctly', () => {
    const wrapper = shallow(<Calendar />)

    const date = moment()

    wrapper.props().children.props.onDateChange(date)

    expect(wrapper.state('date')).toEqual(date)
  })

  it('set placeholder correctly', () => {
    const wrapper = mount(<Calendar placeholder='This-is-placeholder' />)

    expect(wrapper.find('input').prop('placeholder')).toEqual('This-is-placeholder')
  })
})
