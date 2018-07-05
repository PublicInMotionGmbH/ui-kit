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
    const wrapper = mount(<CheckboxGroup
      name='CheckboxGroup5'
      options={[
        { value: 1, label: 'one' },
        { value: 2, label: 'two' },
        { value: 3, label: 'three' }
      ]}
    />)

    expect(wrapper.find('Checkbox').at(1).find('span').text()).toEqual('two')
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
          options={[
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
            { value: 3, label: 'three' }
          ]}
          {...props}
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
  })
})
