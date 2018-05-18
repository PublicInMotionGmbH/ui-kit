import React from 'react'
import { shallow, mount } from 'enzyme'

import Slider from '../src/Slider'

describe('<Slider />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Slider />)

    expect(wrapper).toMatchSnapshot()
  })

  it('sets default value correctly in initial', () => {
    const wrapper = shallow(<Slider />)

    expect(wrapper.state().value).toBe(50)
  })

  it('sets default value correctly when min & max are defined', () => {
    const wrapper = shallow(<Slider min={100} max={700} />)

    expect(wrapper.state().value).toBe(400)
  })

  it('renders label correctly', () => {
    const wrapper = shallow(<Slider label='The label' />)

    expect(wrapper.find('label')).toHaveLength(1)
    expect(wrapper.find('label').props().children).toBe('The label')
  })

  it('change value onChange', () => {
    const spy = jest.fn()
    const wrapper = mount(<Slider onChange={spy} />)

    expect(wrapper.find('input').props().value).toBe(50)

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
