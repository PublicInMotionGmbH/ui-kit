import React from 'react'
import Steps from '../src/Steps'
import { mount, shallow } from 'enzyme'

describe('<Steps />', () => {
  const steps = [
    {
      name: 'Cart',
      disabled: false
    }, {
      name: 'Shipping',
      disabled: false
    }, {
      name: 'Billing',
      disabled: false
    }
  ]

  it('renders correctly', () => {
    const wrapper = shallow(<Steps steps={steps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders current step correctly', () => {
    const step = {
      name: 'Shipping',
      disabled: false
    }
    const wrapper = mount(<Steps steps={steps} current={step} />)

    expect(wrapper.find('Step').at(0).props().active).toEqual(false)
    expect(wrapper.find('Step').at(1).props().active).toEqual(true)
    expect(wrapper.find('Step').at(2).props().active).toEqual(false)
    wrapper.unmount()
  })
  it('renders disabled step correctly', () => {
    const steps = [
      {
        name: 'Cart',
        disabled: false
      }, {
        name: 'Shipping',
        disabled: true
      }, {
        name: 'Billing',
        disabled: false
      }
    ]

    const step = { name: 'Shipping', disabled: true }
    const wrapper = mount(<Steps steps={steps} current={step} />)

    expect(wrapper.find('Step').at(1).props().disabled).toEqual(true)
    wrapper.unmount()
  })

  it('should trigger onChange event on step click', () => {
    const spy = jest.fn()
    const wrapper = mount(<Steps steps={steps} onChange={spy} />)

    const step = wrapper.find('li').at(1)

    step.simulate('click')
    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0][0].name).toEqual('Shipping')
    wrapper.unmount()
  })
})
