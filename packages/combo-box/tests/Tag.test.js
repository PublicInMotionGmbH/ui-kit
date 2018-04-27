import React from 'react'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import Tag from '../src/Tag'

const removeName = prefix('combo-box', 'remove')
const moduleName = prefix('combo-box', 'tag')

describe('<Tag />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Tag
        item='abc'
        getRemoveButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('render value by default correctly', () => {
    const wrapper = shallow(
      <Tag
        item='abc'
        getRemoveButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    const element = wrapper.find(`.${moduleName}__inner`)

    expect(element.text()).toBe('abc')
  })

  it('render object item correctly', () => {
    const wrapper = shallow(
      <Tag
        item='abc'
        getRemoveButtonProps={() => {}}
        renderValue={item => <span id='test'>{item}</span>}
      />
    )

    expect(wrapper.find(`#test`).length).toBe(1)
  })

  it('should pass props from getRemoveButtonProps', () => {
    const wrapper = shallow(
      <Tag
        item='abc'
        getRemoveButtonProps={() => ({ role: 'test' })}
        renderValue={item => item}
      />
    )

    expect(wrapper.find(`.${removeName}`).prop('role')).toBe('test')
  })
})
