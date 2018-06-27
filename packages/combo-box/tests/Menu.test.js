import React from 'react'
import { shallow } from 'enzyme'

import Menu from '../src/Menu'

describe('<Menu />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Menu
        buildItemId={item => item}
        getItemProps={() => {}}
        renderItem={item => item}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should render passed items', () => {
    const render = item => item
    const getItemProps = () => ({})

    const wrapper = shallow(
      <Menu
        options={[ 'abc', 'def', 'ghi' ]}
        buildItemId={item => item}
        getItemProps={getItemProps}
        renderItem={render}
      />
    )

    expect(wrapper.children().length).toBe(3)
    expect(wrapper.children().at(0).prop('item')).toBe('abc')
    expect(wrapper.children().at(1).prop('item')).toBe('def')
    expect(wrapper.children().at(2).prop('item')).toBe('ghi')
  })

  it('should pass correct props to items', () => {
    const render = item => item
    const getItemProps = () => ({})

    const wrapper = shallow(
      <Menu
        options={[ 'abc', 'def', 'ghi' ]}
        buildItemId={item => item}
        getItemProps={getItemProps}
        renderItem={render}
      />
    )

    expect(wrapper.children().at(0).prop('renderItem')).toBe(render)
    expect(wrapper.children().at(0).prop('getItemProps')).toBe(getItemProps)
  })

  it('should build keys for items', () => {
    const render = item => item
    const getItemProps = () => ({})

    const wrapper = shallow(
      <Menu
        options={[ 'abc', 'def', 'ghi' ]}
        buildItemId={(item, index) => index}
        getItemProps={getItemProps}
        renderItem={render}
      />
    )

    expect(wrapper.children().at(0).key()).toBe('0')
    expect(wrapper.children().at(1).key()).toBe('1')
    expect(wrapper.children().at(2).key()).toBe('2')

    wrapper.setProps({ buildItemId: item => item })

    expect(wrapper.children().at(0).key()).toBe('abc')
    expect(wrapper.children().at(1).key()).toBe('def')
    expect(wrapper.children().at(2).key()).toBe('ghi')
  })

  it('should render footer', () => {
    const render = item => item
    const getItemProps = () => ({})

    const wrapper = shallow(
      <Menu
        options={[ 'abc', 'def', 'ghi' ]}
        buildItemId={item => item}
        getItemProps={getItemProps}
        renderItem={render}
        footer={<div>FOOTER</div>}
      />
    )

    expect(wrapper.find('.talixo-combo-box__menu--footer').text()).toBe('FOOTER')
  })
})
