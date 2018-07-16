import React from 'react'
import { shallow } from 'enzyme'

import { buildClassName } from '@talixo/shared'

import Option, { moduleName } from '../src/Option'

// Classes
const emptyCls = `.${buildClassName(moduleName)}--empty`

// Option for testing
const option = {id: 'person', icon: 'person', label: 'Adults', description: 'Older than 15', default: 1}
const optionWithZero = {id: 'person', icon: 'person'}

describe('<Option />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Option key={option.id} option={option} value={1} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render option which value=0 with class .empty', () => {
    const wrapper = shallow(<Option value={0} option={optionWithZero} />)
    expect(wrapper.find(emptyCls).exists()).toBe(true)
  })
})
