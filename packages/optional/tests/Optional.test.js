import React from 'react'
import { shallow, mount } from 'enzyme'

import { prefix } from '@talixo/shared'

import Optional from '../src/Optional'

const moduleName = prefix('optional')

describe('<Optional />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Optional />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders collapsible correctly', () => {
    const wrapper = shallow(<Optional collapsible />)

    expect(wrapper.find(`.${moduleName}__checkbox`)).toHaveLength(1)
    expect(wrapper.find('talixo-textarea')).toHaveLength(0)
  })

  it('render label correclty', () => {
    const wrapper = mount(<Optional label='This is label' />)

    expect(wrapper.find(`.${moduleName}__label`)).toHaveLength(1)
    expect(wrapper.find(`.${moduleName}__label`).prop('children')).toBe('This is label')
  })

  it('handle recevie new value from props', () => {
    const wrapper = shallow(<Optional value='value1' />)

    wrapper.setProps({
      value: 'value2'
    })

    expect(wrapper.state('value')).toBe('value2')
  })

  it('handle Textarea change', () => {
    const wrapper = shallow(<Optional value='value1' />)

    wrapper.find('Textarea').simulate('change', 'Some text')

    expect(wrapper.state('value')).toBe('Some text')
  })

  it('handle Checkbox change', () => {
    const wrapper = mount(<Optional collapsible />)

    wrapper.find('input').simulate('change', {
      target: {
        checked: true
      }
    })

    expect(wrapper.state('visible')).toBe(true)
    expect(wrapper.find('.talixo-textarea')).toHaveLength(1)
  })

  it('should handle `onChange` event properly', () => {
    const spy = jest.fn()
    const wrapper = mount(<Optional onChange={spy} />)

    wrapper.find('textarea').simulate('change', {
      target: {
        value: 'random text'
      }
    })

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 'random text' ])
    expect(wrapper.state('value')).toBe('random text')
  })
})
