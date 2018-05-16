import React from 'react'
import { shallow } from 'enzyme'

import ExpirationDateInput from '../src/ExpirationDateInput'

let D = global.Date

function mock (date) {
  global.Date = jest.fn(() => new D(date))
  global.Date.now = jest.fn(() => date)
}

function unmock () {
  global.Date = D
  global.Date.now = D.now
}

describe('<ExpirationDateInput />', () => {
  beforeEach(() => {
    mock(1483228800000)
  })

  afterEach(unmock)

  it('renders children correctly', () => {
    const wrapper = shallow(<ExpirationDateInput />)

    expect(wrapper).toMatchSnapshot()
  })

  it('passes value correctly', () => {
    const value = {
      month: 1,
      year: 2017
    }

    const wrapper = shallow(<ExpirationDateInput value={value} />)
    const inputMonth = wrapper.find('RangeInput').at(0)
    const inputYear = wrapper.find('RangeInput').at(1)

    expect(inputMonth.props().value).toEqual(1)
    expect(inputYear.props().value).toEqual(2017)
  })
})

describe('onChange', () => {
  it('is called when input value changes', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<ExpirationDateInput onChange={onChange} />)

    const inputMonth = wrapper.find('RangeInput').at(0)
    inputMonth.simulate('change', { target: { value: '2' } })

    expect(onChange).toHaveBeenCalledTimes(1)

    const inputYear = wrapper.find('RangeInput').at(1)
    inputYear.simulate('change', { target: { value: '2' } })

    expect(onChange).toHaveBeenCalledTimes(2)
  })
})
