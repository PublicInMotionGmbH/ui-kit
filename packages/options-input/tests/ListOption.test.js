import React from 'react'
import { shallow, mount } from 'enzyme'

import ListOption from '../src/ListOption'

// Options array for testing
const option = {id: 'person', icon: 'person', label: 'Adults', description: 'Older than 15', default: 1}

describe('<ListOption />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<ListOption key={option.id} option={option} value={1} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('changes value onChange', () => {
    const spy = jest.fn()
    const wrapper = mount(<ListOption
      option={option}
      value={7}
      onChange={spy}
    />)

    wrapper.find('input').simulate('change', {
      target: {
        value: 8
      }
    })

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0][1]).toEqual(8)

    wrapper.unmount()
  })
})
