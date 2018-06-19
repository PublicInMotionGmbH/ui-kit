import React from 'react'
import { shallow, mount } from 'enzyme'

import Slider from '../src/Slider'

describe('<Slider />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Slider />)

    expect(wrapper).toMatchSnapshot()
  })

  it('change value onChange', () => {
    const spy = jest.fn()
    const wrapper = mount(<Slider onChange={spy} />)

    wrapper.find('input').simulate('change', {
      target: {
        value: 30
      }
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.find('input').props().value).toBe(30)

    wrapper.unmount()
  })
})
