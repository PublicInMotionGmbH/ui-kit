import React from 'react'
import { shallow, mount } from 'enzyme'

import CheckboxGroup from '../src/CheckboxGroup'

describe('<CheckboxGroup />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <CheckboxGroup
        name='CheckboxGroup'
        options={[
          { value: 1, label: 'one' },
          { value: 2, label: 'two' },
          { value: 3, label: 'three' }
        ]}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should pass prop name to input', () => {
    const wrapper = mount(
      <CheckboxGroup
        name='CheckboxGroup1'
        options={[
          { value: 1, label: 'one' },
          { value: 2, label: 'two' },
          { value: 3, label: 'three' }
        ]}
      />
    )

    expect(wrapper.find('Checkbox').first().prop('name')).toBe('CheckboxGroup1')
  })

  it('should allow multiple values to be set', () => {
    const wrapper = mount(
      <CheckboxGroup
        name='CheckboxGroup1'
        value={[ 1, 3 ]}
        options={[
          { value: 1, label: 'one' },
          { value: 2, label: 'two' },
          { value: 3, label: 'three' }
        ]}
      />
    )

    expect(wrapper.find('Checkbox').at(0).prop('value')).toBe(true)
    expect(wrapper.find('Checkbox').at(1).prop('value')).toBe(false)
    expect(wrapper.find('Checkbox').at(2).prop('value')).toBe(true)
  })

  it('should pass prop options to input', () => {
    const wrapper = mount(
      <CheckboxGroup
        name='CheckboxGroup2'
        value={[ 2 ]}
        options={[
          { value: 1, label: 'one' },
          { value: 2, label: 'two' },
          { value: 3, label: 'three' }
        ]}
      />
    )

    expect(wrapper.find('Checkbox').at(0).prop('value')).toBe(false)
    expect(wrapper.find('Checkbox').at(1).prop('value')).toBe(true)
  })

  it('should set fixed option', () => {
    const wrapper = mount(
      <CheckboxGroup
        name='CheckboxGroup3'
        value={[ 2 ]}
        options={[
          { value: 1, label: 'one' },
          { value: 2, label: 'two' },
          { value: 3, label: 'three' }
        ]}
      />
    )

    let Checkbox = wrapper.find('Checkbox')

    expect(Checkbox.at(0).prop('value')).toBe(false)
    expect(Checkbox.at(1).prop('value')).toBe(true)
    expect(Checkbox.at(2).prop('value')).toBe(false)
  })

  it('should set as disabled appropriate options', () => {
    const wrapper = mount(
      <CheckboxGroup
        name='CheckboxGroup4'
        options={[
          { value: 1, label: 'one', disabled: true },
          { value: 2, label: 'two', disabled: true },
          { value: 3, label: 'three' }
        ]}
      />
    )

    let Checkbox = wrapper.find('Checkbox')

    expect(Checkbox.at(0).prop('disabled')).toBe(true)
    expect(Checkbox.at(1).prop('disabled')).toBe(true)
    expect(Checkbox.at(2).prop('disabled')).toBe(false)
  })

  it('should render label correctly', () => {
    const wrapper = mount(
      <CheckboxGroup
        name='CheckboxGroup5'
        options={[
          { value: 1, label: 'one' },
          { value: 2, label: 'two' },
          { value: 3, label: 'three' }
        ]}
      />
    )

    expect(wrapper.find('Checkbox').at(1).find('span').first().text()).toEqual('two')
  })

  describe('when passing props', () => {
    const props = {
      onChange: jest.fn(),
      name: 'CheckboxGroupOne'
    }

    let wrapper, input

    beforeAll(() => {
      wrapper = mount(
        <CheckboxGroup
          {...props}
          options={[
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
            { value: 3, label: 'three' }
          ]}
        />
      )
      input = wrapper.find('input[type="checkbox"]').at(0)
      input.simulate('change', { target: { checked: true } })
    })

    it('should call onChange function', () => {
      expect(props.onChange).toHaveBeenCalled()
    })

    it('should pass prop name to input', () => {
      expect(input.props().name).toMatch(props.name)
    })

    it('should select property', () => {
      const spy = jest.fn()

      wrapper = shallow(
        <CheckboxGroup
          {...props}
          value={[ 1 ]}
          onChange={spy}
          options={[
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
            { value: 3, label: 'three' }
          ]}
        />
      )

      expect(spy).toHaveBeenCalledTimes(0)

      wrapper.find('Checkbox').at(1).prop('onChange')(true)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy.mock.calls[0][0]).toEqual([ 1, 2 ])
    })

    it('should unselect property', () => {
      const spy = jest.fn()

      wrapper = shallow(
        <CheckboxGroup
          {...props}
          value={[ 1, 2 ]}
          onChange={spy}
          options={[
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
            { value: 3, label: 'three' }
          ]}
        />
      )

      expect(spy).toHaveBeenCalledTimes(0)

      wrapper.find('Checkbox').at(0).prop('onChange')(false)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy.mock.calls[0][0]).toEqual([ 2 ])
    })

    it('should ignore invalid values', () => {
      const spy = jest.fn()

      wrapper = shallow(
        <CheckboxGroup
          {...props}
          value={[ 4, 5 ]}
          onChange={spy}
          options={[
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
            { value: 3, label: 'three' }
          ]}
        />
      )

      expect(spy).toHaveBeenCalledTimes(0)

      wrapper.find('Checkbox').at(0).prop('onChange')(true)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy.mock.calls[0][0]).toEqual([ 1 ])
    })

    it('should change value correctly', () => {
      const spy = jest.fn()

      wrapper = shallow(
        <CheckboxGroup
          {...props}
          value={[ 1, 2 ]}
          onChange={spy}
          options={[
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
            { value: 3, label: 'three' }
          ]}
        />
      )

      wrapper.setProps({ value: [ 2 ] })

      expect(wrapper.find('Checkbox').at(0).prop('value')).toBe(false)
      expect(wrapper.find('Checkbox').at(1).prop('value')).toBe(true)
      expect(wrapper.find('Checkbox').at(2).prop('value')).toBe(false)

      wrapper.setProps({ value: [ 1 ] })

      expect(wrapper.find('Checkbox').at(0).prop('value')).toBe(true)
      expect(wrapper.find('Checkbox').at(1).prop('value')).toBe(false)
      expect(wrapper.find('Checkbox').at(2).prop('value')).toBe(false)

      wrapper.setProps({ value: [ 4 ] })

      expect(wrapper.find('Checkbox').at(0).prop('value')).toBe(false)
      expect(wrapper.find('Checkbox').at(1).prop('value')).toBe(false)
      expect(wrapper.find('Checkbox').at(2).prop('value')).toBe(false)

      wrapper.setProps({ value: [ 2, 3 ] })

      expect(wrapper.find('Checkbox').at(0).prop('value')).toBe(false)
      expect(wrapper.find('Checkbox').at(1).prop('value')).toBe(true)
      expect(wrapper.find('Checkbox').at(2).prop('value')).toBe(true)
    })

    it('should change value when options are changed', () => {
      const spy = jest.fn()

      wrapper = shallow(
        <CheckboxGroup
          {...props}
          value={[ 1, 3 ]}
          onChange={spy}
          options={[
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
            { value: 3, label: 'three' }
          ]}
        />
      )

      expect(wrapper.state().value).toEqual([ 1, 3 ])

      wrapper.setProps({
        options: [
          { value: 1, label: 'one' },
          { value: 2, label: 'two' }
        ]
      })

      expect(wrapper.state().value).toEqual([ 1 ])
    })
  })
})
