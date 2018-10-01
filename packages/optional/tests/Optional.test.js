import React from 'react'
import { shallow, mount } from 'enzyme'

import { prefix } from '@talixo/shared'
import { Textarea } from '@talixo/textarea'

import Optional from '../src/Optional'

describe('<Optional />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Optional>
        <Textarea />
      </Optional>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('handle receive new value from props', () => {
    const wrapper = shallow(
      <Optional value='value1'>
        <Textarea />
      </Optional>
    )

    wrapper.setProps({
      value: 'value2'
    })

    expect(wrapper.state('value')).toBe('value2')
    expect(wrapper.find(Textarea).prop('value')).toBe('value2')
  })

  it('handle Textarea change', () => {
    const onChange = jest.fn()

    const wrapper = mount(
      <Optional value='value1' onChange={onChange}>
        <Textarea />
      </Optional>
    )

    wrapper.find('textarea').simulate('change', { target: { value: 'Some text' } })

    expect(onChange.mock.calls.length).toBe(1)
    expect(onChange.mock.calls[0][0]).toBe('Some text')
    expect(wrapper.state('value')).toBe('value1')
  })

  it('handle Checkbox change', () => {
    const wrapper = mount(
      <Optional>
        <Textarea />
      </Optional>
    )

    wrapper.find('input').simulate('change', {
      target: {
        checked: true
      }
    })

    expect(wrapper.state('visible')).toBe(true)
    expect(wrapper.find(`.${prefix('textarea')}`)).toHaveLength(1)

    wrapper.unmount()
  })
})
