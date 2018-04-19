import React from 'react'
import Steps from '../src/Steps'
import { mount, shallow } from 'enzyme'

describe('<Steps />', () => {
  const steps = ['Cart', 'Shipping', 'Billing']

  it('renders correctly', () => {
    const wrapper = shallow(<Steps steps={steps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders current step correctly', () => {
    const wrapper = mount(<Steps steps={steps} current={2} />)

    expect(wrapper.find('Step').at(0).props().active).toEqual(false)
    expect(wrapper.find('Step').at(1).props().active).toEqual(true)
    expect(wrapper.find('Step').at(2).props().disabled).toEqual(true)
    wrapper.unmount()
  })

  it('should trigger onChange event on step click', () => {
    const spy = jest.fn()
    const wrapper = mount(<Steps steps={steps} onChange={spy} />)

    const step = wrapper.find('li').at(1)

    step.simulate('click')
    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 2 ])
    wrapper.unmount()
  })
})
