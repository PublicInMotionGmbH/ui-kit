import React from 'react'
import { mount } from 'enzyme'
import { prefix } from '@talixo/shared'

import Menu from '../src/Menu'

const name = prefix('combo-box')

describe('<Menu />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Menu items={[1, 3, 5]} />)

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders highlighted item correctly', () => {
    const wrapper = mount(<Menu highlightedIndex={1} items={[1, 3, 5]} />)

    const otherItem = wrapper.find(`.${name}__item`).at(0)
    const highlitedItem = wrapper.find(`.${name}__item`).at(1)

    expect(otherItem.hasClass(`${name}__item--highlighted`)).toBe(false)
    expect(highlitedItem.hasClass(`${name}__item--highlighted`)).toBe(true)
    wrapper.unmount()
  })

  it('renders selected item correctly', () => {
    const wrapper = mount(<Menu selectedItem={3} items={[1, 3, 5]} />)
    const otherItem = wrapper
      .find(`.${name}__item`)
      .at(0)
    const highlitedItem = wrapper
      .find(`.${name}__item`)
      .at(1)

    expect(otherItem.hasClass(`${name}__item--selected`)).toBe(false)
    expect(highlitedItem.hasClass(`${name}__item--selected`)).toBe(true)
    wrapper.unmount()
  })

  it('renders maxHeight correctly', () => {
    const wrapper = mount(<Menu maxHeight='200px' items={[1, 3, 5]} />)

    expect(wrapper.find(`.${name}__options`).prop('style').maxHeight).toBe('200px')
    expect(wrapper.find(`.${name}__options`).prop('style').overflowY).toBe('auto')
    wrapper.unmount()
  })

  it('renders overflow set to truncate correctly', () => {
    const wrapper = mount(<Menu overflow='truncate' items={[1, 3, 5]} />)

    expect(wrapper.find(`.${name}-item`).every(`.${name}__item--overflow-truncate`)).toBe(true)
    wrapper.unmount()
  })

  it('renders overflow set to break correctly', () => {
    const wrapper = mount(<Menu overflow='break' items={[1, 3, 5]} />)

    expect(wrapper.find(`.${name}-item`).every(`.${name}__item--overflow-break`)).toBe(true)
    wrapper.unmount()
  })

  it('renders item component correctly', () => {
    const wrapper = mount(
      <Menu
        overflow='break'
        itemComponent={({ item }) => (
          <div>
            <span>{item.value}</span>
          </div>
        )}
        items={[{ value: 1 }, { value: 3 }, { value: 5 }]}
      />
    )

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
