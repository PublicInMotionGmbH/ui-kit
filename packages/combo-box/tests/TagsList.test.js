import React from 'react'
import { shallow } from 'enzyme'

import TagsList from '../src/TagsList'

describe('<TagsList />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <TagsList
        buildItemId={item => item}
        getRemoveButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should render passed items', () => {
    const render = item => item
    const getRemoveButtonProps = () => ({})

    const wrapper = shallow(
      <TagsList
        selectedItems={[ 'abc', 'def', 'ghi' ]}
        buildItemId={item => item}
        getRemoveButtonProps={getRemoveButtonProps}
        renderValue={render}
      />
    )

    expect(wrapper.children().length).toBe(3)
    expect(wrapper.children().at(0).prop('item')).toBe('abc')
    expect(wrapper.children().at(1).prop('item')).toBe('def')
    expect(wrapper.children().at(2).prop('item')).toBe('ghi')
  })

  it('should pass correct props to items', () => {
    const render = item => item
    const getRemoveButtonProps = () => ({})

    const wrapper = shallow(
      <TagsList
        selectedItems={[ 'abc', 'def', 'ghi' ]}
        buildItemId={item => item}
        getRemoveButtonProps={getRemoveButtonProps}
        renderValue={render}
      />
    )

    expect(wrapper.children().at(0).prop('renderValue')).toBe(render)
    expect(wrapper.children().at(0).prop('getRemoveButtonProps')).toBe(getRemoveButtonProps)
  })

  it('should build keys for items', () => {
    const render = item => item
    const getRemoveButtonProps = () => ({})

    const wrapper = shallow(
      <TagsList
        selectedItems={[ 'abc', 'def', 'ghi' ]}
        buildItemId={(item, index) => index}
        getRemoveButtonProps={getRemoveButtonProps}
        renderValue={render}
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
})
