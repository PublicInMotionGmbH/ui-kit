import React from 'react'
import { shallow, mount } from 'enzyme'

import { prefix } from '@talixo/shared'

import ComboBoxValue from '../src/ComboBoxValue'

const moduleName = prefix('combo-box', 'value')
const innerName = prefix('combo-box', 'inner')
const clearName = prefix('combo-box', 'clear')
const arrowName = prefix('combo-box', 'arrow')

describe('<ComboBoxValue />', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('should render correctly', () => {
    const wrapper = shallow(
      <ComboBoxValue
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        getClearButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should not add information about placeholder to wrapper', () => {
    const wrapper = shallow(
      <ComboBoxValue
        selectedItems={[ 'abc' ]}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        getClearButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.hasClass(`${moduleName}--placeholder`)).toBe(false)
  })

  it('should add information about placeholder to wrapper', () => {
    const wrapper = shallow(
      <ComboBoxValue
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        getClearButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.hasClass(`${moduleName}--placeholder`)).toBe(true)
  })

  it('should use getToggleButtonProps', () => {
    const wrapper = shallow(
      <ComboBoxValue
        getToggleButtonProps={() => ({ role: 'test' })}
        getInputProps={() => {}}
        getClearButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.prop('role')).toBe('test')
  })

  it('should use getInputProps', () => {
    const wrapper = shallow(
      <ComboBoxValue
        getToggleButtonProps={() => {}}
        getInputProps={() => ({ role: 'test' })}
        getClearButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.find(`.${innerName}`).find('input').prop('role')).toBe('test')
  })

  it('should use getClearButtonProps', () => {
    const wrapper = shallow(
      <ComboBoxValue
        selectedItems={[ 'abc' ]}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        getClearButtonProps={props => ({ ...props, role: 'test' })}
        renderValue={item => item}
      />
    )

    expect(wrapper.find(`.${clearName}`).prop('role')).toBe('test')
  })

  it('should render input when there is no value', () => {
    const wrapper = shallow(
      <ComboBoxValue
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        getClearButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.find(`.${innerName}`).find('input').length).toBe(1)
  })

  it('should render input with value', () => {
    const wrapper = shallow(
      <ComboBoxValue
        inputValue='abc'
        getToggleButtonProps={() => {}}
        getInputProps={props => props}
        getClearButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.find(`.${innerName}`).find('input').prop('value')).toBe('abc')
  })

  it('should render value when there is selected', () => {
    const wrapper = shallow(
      <ComboBoxValue
        selectedItems={[ 'abc' ]}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        getClearButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.find(`.${innerName}`).text()).toBe('abc')
  })

  it('should render special value when there is selected', () => {
    const wrapper = shallow(
      <ComboBoxValue
        selectedItems={[ { id: 'abc' } ]}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        getClearButtonProps={() => {}}
        renderValue={item => <span id='test'>{item.id}</span>}
      />
    )

    expect(wrapper.find(`.${innerName}`).find('#test').length).toBe(1)
    expect(wrapper.find(`.${innerName}`).find('#test').text()).toBe('abc')
  })

  it('should show icon when it is passed', () => {
    const wrapper = shallow(
      <ComboBoxValue
        icon={<span id='test' />}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        getClearButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.find(`#test`).length).toBe(1)
  })

  it('should show open arrow', () => {
    const wrapper = shallow(
      <ComboBoxValue
        isOpen={false}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        getClearButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.find(`.${arrowName}`).find('Icon').prop('name')).toBe('expand_more')
  })

  it('should show close arrow', () => {
    const wrapper = shallow(
      <ComboBoxValue
        isOpen
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        getClearButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper.find(`.${arrowName}`).find('Icon').prop('name')).toBe('expand_less')
  })

  it('should focus input after focusing combo box', () => {
    const wrapper = mount(
      <ComboBoxValue
        getToggleButtonProps={props => props}
        getInputProps={() => {}}
        getClearButtonProps={() => {}}
        renderValue={item => item}
      />
    )

    wrapper.simulate('focus')

    const input = wrapper.find(`.${innerName}`).find('input')

    expect(document.activeElement).toBe(input.getDOMNode())
  })

  it('should focus input after clearing combo box', () => {
    const wrapper = mount(
      <ComboBoxValue
        selectedItems={[ 'abc' ]}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        getClearButtonProps={props => props}
        renderValue={item => item}
      />
    )

    wrapper.find(`.${clearName}`).simulate('click')

    wrapper.setProps({ selectedItems: [] })

    // Focus after 'clear' button is delayed
    jest.runAllTimers()

    const input = wrapper.find(`.${innerName}`).find('input')

    expect(document.activeElement).toBe(input.getDOMNode())
  })

  it('should not try to focus with delay when it is already unmounted', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <ComboBoxValue
        selectedItems={[ 'abc' ]}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        getClearButtonProps={props => props}
        renderValue={item => item}
      />
    )

    wrapper.instance().focus = spy

    wrapper.find(`.${clearName}`).simulate('click')

    wrapper.unmount()

    // Focus after 'clear' button is delayed
    jest.runAllTimers()
    expect(spy.mock.calls.length).toBe(0)
  })
})
