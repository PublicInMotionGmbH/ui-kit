import React from 'react'
import Switcher from '../src/Switcher'
import { shallow } from 'enzyme'

describe('<Switcher />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Switcher />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should handle defaultChecked correctly', () => {
    const wrapper = shallow(<Switcher defaultChecked />)

    expect(wrapper.find('input').prop('checked')).toBe(true)
  })

  it('should be not checked by default', () => {
    const wrapper = shallow(<Switcher />)

    expect(wrapper.find('input').prop('checked')).toBe(false)
  })

  it('should use value correctly', () => {
    const wrapper = shallow(<Switcher value />)

    expect(wrapper.find('input').prop('checked')).toBe(true)

    wrapper.setProps({ value: false })
    expect(wrapper.find('input').prop('checked')).toBe(false)
  })

  it('should handle onChange event', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Switcher value onChange={spy} />)

    wrapper.find('input').props().onChange({ target: { checked: false } })

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0][0]).toBe(false)
  })

  it('should be controlled correctly', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Switcher value onChange={spy} />)

    wrapper.find('input').props().onChange({ target: { checked: false } })
    expect(wrapper.find('input').prop('checked')).toBe(true)

    wrapper.setProps({ value: false })
    expect(wrapper.find('input').prop('checked')).toBe(false)

    wrapper.find('input').props().onChange({ target: { checked: true } })
    expect(wrapper.find('input').prop('checked')).toBe(false)
  })

  it('should be self-controlled correctly', () => {
    const wrapper = shallow(<Switcher />)

    expect(wrapper.find('input').prop('checked')).toBe(false)

    wrapper.find('input').props().onChange({ target: { checked: true } })
    expect(wrapper.state().value).toBe(true)
    // expect(wrapper.find('input').prop('checked')).toBe(true)

    wrapper.find('input').props().onChange({ target: { checked: false } })
    expect(wrapper.state().value).toBe(false)
  })
})
