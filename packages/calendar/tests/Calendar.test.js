import React from 'react'
import { shallow } from 'enzyme'

import Calendar from '../src/Calendar'

import moment from 'moment'

describe('<Calendar />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Calendar />)

    expect(wrapper).toMatchSnapshot()
  })

  it('change date correctly', () => {
    const wrapper = shallow(<Calendar />)

    const date = moment()

    wrapper.props().children.props.onDateChange(date)

    expect(wrapper.state('date')).toEqual(date)
  })

  it('change lang correctly', () => {
    const wrapper = shallow(<Calendar lang='es' />)

    console.log(wrapper)
  })
})
