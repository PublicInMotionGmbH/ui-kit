import React from 'react'
import { shallow, mount } from 'enzyme'

import OptionsInput from '../src/OptionsInput'

describe('<OptionsInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<OptionsInput options={[{id: 'person', icon: 'person', label: 'Adults', description: 'Older than 15', default: 1},
      {id: 'rocket', icon: 'rocket', label: 'Rockets'}]}
    />)

    expect(wrapper).toMatchSnapshot()
  })

  it('passes icon prop correctly', () => {
    const wrapper = mount(<OptionsInput
      options={[{id: 'person', icon: 'person', label: 'Adults', description: 'Older than 15', default: 1},
        {id: 'rocket', icon: 'rocket', label: 'Rockets', default: 1}]}
    />)

    expect(wrapper.find('Tooltip').find('Icon').at(0).prop('name')).toBe('person')

    wrapper.unmount()
  })

  it('changes value onChange', () => {
    const spy = jest.fn()
    const wrapper = mount(<OptionsInput
      options={[{id: 'person', icon: 'person', label: 'Adults', description: 'Older than 15', default: 1},
        {id: 'rocket', icon: 'rocket', label: 'Rockets', default: 1}]}
      onChange={spy}
    />)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 8
      }
    })

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0][0].person).toEqual(8)

    wrapper.unmount()
  })

  it('sets correct default value', () => {
    const wrapper = mount(<OptionsInput
      options={[{id: 'person', icon: 'person', label: 'Adults', description: 'Older than 15', default: 2},
        {id: 'rocket', icon: 'rocket', label: 'Rockets', default: 1}]}
    />)

    expect(wrapper.find('NumberInput').at(0).prop('value')).toBe(2)

    wrapper.unmount()
  })

  it('passes correctly props', () => {
    const wrapper = mount(<OptionsInput
      options={[{id: 'person', icon: 'person', label: 'Adults', description: 'Older than 15', default: 2, max: 9},
        {id: 'rocket', icon: 'rocket', label: 'Rockets', default: 1}]}
    />)

    expect(wrapper.prop('options')[0].max).toBe(9)
    wrapper.setProps({options: [{ id: 'person', max: 10, icon: 'flight' }]})
    expect(wrapper.prop('options')[0].max).toBe(10)

    wrapper.unmount()
  })

  it('open list when focus on button', () => {
    const wrapper = mount(<OptionsInput
      options={[{id: 'person', icon: 'person', label: 'Adults', description: 'Older than 15', default: 3},
        {id: 'rocket', icon: 'rocket', label: 'Rockets', default: 1}]}
    />)

    expect(wrapper.state('open')).toBe(false)

    wrapper.find('button').at(0).simulate('focus')

    expect(wrapper.state('open')).toBe(true)
    wrapper.unmount()
  })

  it('calls blur function when onBlur is triggered', () => {
    const spy = jest.fn()
    const wrapper = mount(<OptionsInput
      options={[{id: 'person', icon: 'person', label: 'Adults', description: 'Older than 15', default: 3},
        {id: 'rocket', icon: 'rocket', label: 'Rockets', default: 1}]}
      onBlur={spy}
    />)

    wrapper.find('button').at(0).simulate('blur')

    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  it('close ListOption when click outside the OptionsInput component', () => {
    const wrapper = mount(<OptionsInput
      options={[{id: 'person', icon: 'person', label: 'Adults', description: 'Older than 15', default: 3},
        {id: 'rocket', icon: 'rocket', label: 'Rockets', default: 1}]}
    />)

    wrapper.find('button').at(0).simulate('focus')

    expect(wrapper.state('open')).toBe(true)

    document.body.click()

    expect(wrapper.state('open')).toBe(false)

    wrapper.unmount()
  })
})
