import React from 'react'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import MenuItem from '../src/MenuItem'

const moduleName = prefix('combo-box', 'item')

describe('<MenuItem />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <MenuItem
        item='abc'
        index={0}
        getItemProps={() => {}}
        renderItem={item => item}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should not highlight item', () => {
    const wrapper = shallow(
      <MenuItem
        item='abc'
        index={0}
        getItemProps={() => {}}
        renderItem={item => item}
      />
    )

    expect(wrapper.hasClass(`${moduleName}--highlighted`)).toBe(false)
  })

  it('should highlight item', () => {
    const wrapper = shallow(
      <MenuItem
        item='abc'
        index={0}
        highlightedIndex={0}
        getItemProps={() => {}}
        renderItem={item => item}
      />
    )

    expect(wrapper.hasClass(`${moduleName}--highlighted`)).toBe(true)
  })

  it('should not select item', () => {
    const wrapper = shallow(
      <MenuItem
        item='abc'
        index={0}
        selectedItems={[]}
        getItemProps={() => {}}
        renderItem={item => item}
      />
    )

    expect(wrapper.hasClass(`${moduleName}--selected`)).toBe(false)
  })

  it('should select item', () => {
    const wrapper = shallow(
      <MenuItem
        item='abc'
        index={0}
        selectedItems={[ 'abc' ]}
        getItemProps={() => {}}
        renderItem={item => item}
      />
    )

    expect(wrapper.hasClass(`${moduleName}--selected`)).toBe(true)
  })

  it('render item by default correctly', () => {
    const wrapper = shallow(
      <MenuItem
        item='abc'
        index={0}
        getItemProps={() => {}}
        renderItem={item => item}
      />
    )

    const element = wrapper.find(`.${moduleName}__inner`)

    expect(element.text()).toBe('abc')
  })

  it('render object item correctly', () => {
    const wrapper = shallow(
      <MenuItem
        item='abc'
        index={0}
        getItemProps={() => {}}
        renderItem={item => <span id='test'>{item}</span>}
      />
    )

    expect(wrapper.find(`#test`).length).toBe(1)
  })

  it('should pass props from getItemProps', () => {
    const wrapper = shallow(
      <MenuItem
        item='abc'
        index={0}
        getItemProps={() => ({ role: 'test' })}
        renderItem={item => item}
      />
    )

    expect(wrapper.prop('role')).toBe('test')
  })
})
