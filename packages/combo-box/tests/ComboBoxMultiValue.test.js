import React from 'react'
import { shallow, mount } from 'enzyme'

import { prefix } from '@talixo/shared'

import ComboBoxMultiValue from '../src/ComboBoxMultiValue'

const moduleName = prefix('combo-box', 'value')
const innerName = prefix('combo-box', 'inner')
const arrowName = prefix('combo-box', 'arrow')

describe('<ComboBoxMultiValue />', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('should render correctly', () => {
    const wrapper = shallow(
      <ComboBoxMultiValue
        getRemoveButtonProps={props => props}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        renderValue={item => item}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should not add information about placeholder to wrapper', () => {
    const wrapper = shallow(
      <ComboBoxMultiValue
        selectedItems={[ 'abc' ]}
        getRemoveButtonProps={props => props}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    expect(wrapper.hasClass(`${moduleName}--placeholder`)).toBe(false)
  })

  it('should add information about placeholder to wrapper', () => {
    const wrapper = shallow(
      <ComboBoxMultiValue
        getRemoveButtonProps={props => props}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    expect(wrapper.hasClass(`${moduleName}--placeholder`)).toBe(true)
  })

  it('should use getToggleButtonProps', () => {
    const wrapper = shallow(
      <ComboBoxMultiValue
        getRemoveButtonProps={props => props}
        getToggleButtonProps={() => ({ role: 'test' })}
        getInputProps={() => {}}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    expect(wrapper.prop('role')).toBe('test')
  })

  it('should use getInputProps', () => {
    const wrapper = shallow(
      <ComboBoxMultiValue
        getRemoveButtonProps={props => props}
        getToggleButtonProps={() => {}}
        getInputProps={() => ({ role: 'test' })}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    expect(wrapper.find(`.${innerName}`).find('AutosizeInput').prop('role')).toBe('test')
  })

  it('should render input when there is no value', () => {
    const wrapper = shallow(
      <ComboBoxMultiValue
        getRemoveButtonProps={props => props}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    expect(wrapper.find(`.${innerName}`).find('AutosizeInput').length).toBe(1)
  })

  it('should render input when there is value anyway', () => {
    const wrapper = shallow(
      <ComboBoxMultiValue
        selectedItems={[ 'abc' ]}
        getRemoveButtonProps={props => props}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    expect(wrapper.find(`.${innerName}`).find('AutosizeInput').length).toBe(1)
  })

  it('should render input with value', () => {
    const wrapper = shallow(
      <ComboBoxMultiValue
        inputValue='abc'
        getRemoveButtonProps={props => props}
        getToggleButtonProps={() => {}}
        getInputProps={props => props}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    expect(wrapper.find(`.${innerName}`).find('AutosizeInput').prop('value')).toBe('abc')
  })

  it('should not render value when there is nothing selected', () => {
    const wrapper = shallow(
      <ComboBoxMultiValue
        getRemoveButtonProps={props => props}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    expect(wrapper.find('TagsList').length).toBe(0)
  })

  it('should render value when there is selected', () => {
    const wrapper = shallow(
      <ComboBoxMultiValue
        selectedItems={[ 'abc' ]}
        getRemoveButtonProps={props => props}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    expect(wrapper.find('TagsList').prop('selectedItems')).toEqual([ 'abc' ])
  })

  it('should show icon when it is passed', () => {
    const wrapper = shallow(
      <ComboBoxMultiValue
        icon={<span id='test' />}
        getRemoveButtonProps={props => props}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    expect(wrapper.find(`#test`).length).toBe(1)
  })

  it('should show open arrow', () => {
    const wrapper = shallow(
      <ComboBoxMultiValue
        isOpen={false}
        getRemoveButtonProps={props => props}
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    expect(wrapper.find(`.${arrowName}`).find('Icon').prop('name')).toBe('expand_more')
  })

  it('should show close arrow', () => {
    const wrapper = shallow(
      <ComboBoxMultiValue
        getRemoveButtonProps={props => props}
        isOpen
        getToggleButtonProps={() => {}}
        getInputProps={() => {}}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    expect(wrapper.find(`.${arrowName}`).find('Icon').prop('name')).toBe('expand_less')
  })

  it('should focus input after focusing combo box', () => {
    const wrapper = mount(
      <ComboBoxMultiValue
        getRemoveButtonProps={props => props}
        getToggleButtonProps={props => props}
        getInputProps={() => {}}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    wrapper.simulate('focus')

    const input = wrapper.find(`.${innerName}`).find('input')

    expect(document.activeElement).toBe(input.getDOMNode())

    wrapper.unmount()
  })

  describe('update styles listeners', () => {
    const addEventListener = window.addEventListener
    const removeEventListener = window.removeEventListener

    beforeEach(() => {
      window.addEventListener = jest.fn()
      window.removeEventListener = jest.fn()
    })

    it('should add suffix listeners', () => {
      const wrapper = mount(
        <ComboBoxMultiValue
          getRemoveButtonProps={props => props}
          getToggleButtonProps={props => props}
          getInputProps={() => {}}
          renderValue={item => item}
          buildItemId={item => item}
        />
      )

      expect(window.addEventListener.mock.calls.filter(x => x[0] === 'load').length).toBe(1)
      expect(window.addEventListener.mock.calls.filter(x => x[0] === 'resize').length).toBe(1)

      wrapper.unmount()
    })

    it('should remove listeners on unmount', () => {
      const wrapper = mount(
        <ComboBoxMultiValue
          getRemoveButtonProps={props => props}
          getToggleButtonProps={props => props}
          getInputProps={() => {}}
          renderValue={item => item}
          buildItemId={item => item}
        />
      )

      wrapper.unmount()

      expect(window.removeEventListener.mock.calls.filter(x => x[0] === 'load').length).toBe(1)
      expect(window.removeEventListener.mock.calls.filter(x => x[0] === 'resize').length).toBe(1)
    })

    afterAll(() => {
      window.addEventListener = addEventListener
      window.removeEventListener = removeEventListener
    })
  })

  it('should force updating styles on resize', () => {
    const wrapper = mount(
      <ComboBoxMultiValue
        getRemoveButtonProps={props => props}
        getToggleButtonProps={props => props}
        getInputProps={() => {}}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    const previousKey = wrapper.state().inputKey

    window.dispatchEvent(new window.Event('resize'))

    expect(previousKey).not.toBe(wrapper.state().inputKey)

    wrapper.unmount()
  })

  it('should force updating styles on load', () => {
    const wrapper = mount(
      <ComboBoxMultiValue
        getRemoveButtonProps={props => props}
        getToggleButtonProps={props => props}
        getInputProps={() => {}}
        renderValue={item => item}
        buildItemId={item => item}
      />
    )

    const previousKey = wrapper.state().inputKey

    window.dispatchEvent(new window.Event('load'))

    expect(previousKey).not.toBe(wrapper.state().inputKey)

    wrapper.unmount()
  })
})
