import React from 'react'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import SelectBoxValue from '../src/SelectBoxValue'

const moduleName = prefix('combo-box', 'value')
const innerName = prefix('combo-box', 'inner')
const iconName = prefix('combo-box', 'icon')
const arrowName = prefix('combo-box', 'arrow')

describe('<SelectBoxValue />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <SelectBoxValue
        getToggleButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should render placeholder when there is no single value', () => {
    const wrapper = shallow(
      <SelectBoxValue
        getToggleButtonProps={() => {}}
        renderValue={item => item}
        placeholder={<span id='placeholder' />}
      />
    )

    expect(wrapper.find('#placeholder').length).toBe(1)
  })

  it('should render placeholder when there is no multi value', () => {
    const wrapper = shallow(
      <SelectBoxValue
        multi
        getRemoveButtonProps={() => {}}
        getToggleButtonProps={() => {}}
        renderValue={item => item}
        buildItemId={item => item}
        placeholder={<span id='placeholder' />}
      />
    )

    expect(wrapper.find('#placeholder').length).toBe(1)
  })

  it('should not add information about placeholder to wrapper', () => {
    const wrapper = shallow(
      <SelectBoxValue
        selectedItems={[ 'abc' ]}
        getToggleButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.hasClass(`${moduleName}--placeholder`)).toBe(false)
  })

  it('should add information about placeholder to wrapper', () => {
    const wrapper = shallow(
      <SelectBoxValue
        getToggleButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.hasClass(`${moduleName}--placeholder`)).toBe(true)
  })

  it('should render single value', () => {
    const wrapper = shallow(
      <SelectBoxValue
        selectedItems={[ 'abc' ]}
        getToggleButtonProps={() => {}}
        renderValue={item => item}
        placeholder={<span id='placeholder' />}
      />
    )

    expect(wrapper.find(`.${innerName}`).text()).toBe('abc')
  })

  it('should render special value', () => {
    const wrapper = shallow(
      <SelectBoxValue
        selectedItems={[ { id: '10' } ]}
        getToggleButtonProps={() => {}}
        renderValue={item => <span id='test'>{item.id}</span>}
        placeholder={<span id='placeholder' />}
      />
    )

    expect(wrapper.find('#test').length).toBe(1)
    expect(wrapper.find('#test').text()).toBe('10')
  })

  it('should not render icon by default', () => {
    const wrapper = shallow(
      <SelectBoxValue
        getToggleButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.find(`.${iconName}`).length).toBe(0)
  })

  it('should render provided icon', () => {
    const wrapper = shallow(
      <SelectBoxValue
        icon={<span id='icon' />}
        getToggleButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.find(`.${iconName}`).length).toBe(1)
    expect(wrapper.find(`#icon`).length).toBe(1)
  })

  it('should render open icon', () => {
    const wrapper = shallow(
      <SelectBoxValue
        isOpen
        getToggleButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.find(`.${arrowName}`).find('Icon').prop('name')).toBe('expand_less')
  })

  it('should render close icon', () => {
    const wrapper = shallow(
      <SelectBoxValue
        isOpen={false}
        getToggleButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.find(`.${arrowName}`).find('Icon').prop('name')).toBe('expand_more')
  })

  it('should render list of tags for multi selection with many elements', () => {
    const selectedItems = [ 'abc', 'def' ]
    const getToggleButtonProps = () => {}

    const wrapper = shallow(
      <SelectBoxValue
        multi
        selectedItems={selectedItems}
        isOpen={false}
        getRemoveButtonProps={() => {}}
        getToggleButtonProps={getToggleButtonProps}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    expect(wrapper.find('TagsList').length).toBe(1)
    expect(wrapper.find('TagsList').prop('selectedItems')).toBe(selectedItems)
  })
})
