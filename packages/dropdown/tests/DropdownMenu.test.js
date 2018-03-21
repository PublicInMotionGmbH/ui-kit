import React from 'react'
import DropdownMenu from '../src/DropdownMenu'
import { mount } from 'enzyme'
import { prefix } from '@talixo/commons'

const name = prefix('select')

describe('<DropdownMenu />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<DropdownMenu items={[1, 3, 5]} />)

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders highlighted item correctly', () => {
    const wrapper = mount(<DropdownMenu highlightedIndex={1} items={[1, 3, 5]} />)

    expect(
      wrapper
        .find(`.${name}-item`)
        .at(0)
        .hasClass(`${name}-item-highlighted`)
    ).toEqual(false)
    expect(
      wrapper
        .find(`.${name}-item`)
        .at(1)
        .hasClass(`${name}-item-highlighted`)
    ).toEqual(true)
    wrapper.unmount()
  })

  it('renders selected item correctly', () => {
    const wrapper = mount(<DropdownMenu selectedItem={3} items={[1, 3, 5]} />)

    expect(
      wrapper
        .find(`.${name}-item`)
        .at(0)
        .hasClass(`${name}-item-selected`)
    ).toEqual(false)
    expect(
      wrapper
        .find(`.${name}-item`)
        .at(1)
        .hasClass(`${name}-item-selected`)
    ).toEqual(true)
    wrapper.unmount()
  })

  it('renders maxHeight correctly', () => {
    const wrapper = mount(<DropdownMenu maxHeight='200px' items={[1, 3, 5]} />)

    expect(wrapper.find(`.${name}-options`).prop('style').maxHeight).toEqual('200px')
    expect(wrapper.find(`.${name}-options`).prop('style').overflowY).toEqual('auto')
    wrapper.unmount()
  })

  it('renders overflow set to truncate correctly', () => {
    const wrapper = mount(<DropdownMenu overflow='truncate' items={[1, 3, 5]} />)

    expect(wrapper.find(`.${name}-item`).every(`.${name}-item-overflow-truncate`)).toEqual(true)
    wrapper.unmount()
  })

  it('renders overflow set to break correctly', () => {
    const wrapper = mount(<DropdownMenu overflow='break' items={[1, 3, 5]} />)

    expect(wrapper.find(`.${name}-item`).every(`.${name}-item-overflow-break`)).toEqual(true)
    wrapper.unmount()
  })

  it('renders item component correctly', () => {
    const wrapper = mount(
      <DropdownMenu
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
