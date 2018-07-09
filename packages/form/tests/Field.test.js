import React from 'react'
import { shallow, mount } from 'enzyme'

import { TextInput } from '@talixo/text-input'

import Field, { moduleName, resetIdCounter } from '../src/Field'

const createWrapper = (props, childProps) => shallow(
  <Field {...props}>
    <TextInput {...childProps} />
  </Field>
)

describe('module name', () => {
  beforeEach(() => {
    resetIdCounter()
  })

  it('exports correctly', () => {
    expect(moduleName).toEqual('field')
  })
})

describe('<Field />', () => {
  it('renders children correctly', () => {
    const wrapper = createWrapper()

    expect(wrapper).toMatchSnapshot()
  })

  it('throws error when no child is proivided', () => {
    const wrapper = () => shallow(<Field />)

    expect(wrapper).toThrow()
  })

  it('throws error when multiple children are proivided', () => {
    const wrapper = () => shallow(
      <Field>
        <TextInput />
        <TextInput />
      </Field>
    )

    expect(wrapper).toThrow()
  })

  it('passes className correctly', () => {
    const className = 'surname'
    const wrapper = createWrapper({ className })

    expect(wrapper.hasClass(className)).toEqual(true)
  })

  it('passes value correctly', () => {
    const value = 'some value'
    const wrapper = createWrapper({ value })
    const input = wrapper.find('TextInput')

    expect(input.props().value).toEqual(value)
  })
})

describe('label', () => {
  beforeEach(() => {
    resetIdCounter()
  })

  it('renders correctly', () => {
    const label = 'name'
    const wrapper = createWrapper({ label })
    const labelNode = wrapper.find('label')

    expect(labelNode.exists()).toEqual(true)
  })

  it('receives passed id', () => {
    const label = 'name'
    const id = 'form_field_name'
    const wrapper = createWrapper({ id, label })
    const labelNode = wrapper.find('label')

    expect(labelNode.first().props().htmlFor).toEqual(id)
  })

  it('receives generated id when id is not provided', () => {
    const label = 'name'
    const wrapper = createWrapper({ label })
    const labelNode = wrapper.find('label')

    expect(labelNode.first().props().htmlFor).toEqual('form_field_1')
  })
})

describe('error', () => {
  beforeEach(() => {
    resetIdCounter()
  })

  it('renders correctly', () => {
    const error = 'Random error'
    const wrapper = createWrapper({ error })
    const errorNode = wrapper.find('.talixo-field__message--error')

    expect(errorNode.exists()).toEqual(true)
  })

  it('is passed to input', () => {
    const error = 'Random error'
    const wrapper = shallow(
      <Field error={error}>
        <TextInput />
      </Field>
    )

    const input = wrapper.find(TextInput)
    expect(input.props().error).toEqual(true)
  })
})

describe('warning', () => {
  beforeEach(() => {
    resetIdCounter()
  })

  it('renders correctly', () => {
    const warning = 'Random warning'
    const wrapper = createWrapper({ warning })
    const warningNode = wrapper.find('.talixo-field__message--warning')

    expect(warningNode.exists()).toEqual(true)
  })
})

describe('hint', () => {
  beforeEach(() => {
    resetIdCounter()
  })

  it('renders correctly', () => {
    const hint = 'Random hint'
    const wrapper = createWrapper({ hint })
    const hintNode = wrapper.find('.talixo-field__hint')

    expect(hintNode.exists()).toEqual(true)
  })
})

describe('onChange', () => {
  beforeEach(() => {
    resetIdCounter()
  })

  it('is called', () => {
    const onChange = jest.fn()
    const value = 'name'
    const wrapper = createWrapper({ onChange })
    const input = wrapper.find('TextInput')
    input.simulate('change', { target: { value } })

    expect(onChange).toHaveBeenCalled()
  })

  it('passes value correctly', () => {
    let typedValue
    const onChange = jest.fn().mockImplementation(n => { typedValue = n })
    const value = 'name'
    const wrapper = createWrapper({ onChange })
    const input = wrapper.find('TextInput')
    input.simulate('change', value)

    expect(typedValue).toEqual(value)
  })
})

describe('onFocus', () => {
  beforeEach(() => {
    resetIdCounter()
  })

  it('is called', () => {
    const onFocus = jest.fn()
    const wrapper = createWrapper({ onFocus })
    const input = wrapper.find('TextInput')
    input.simulate('focus')

    expect(onFocus).toHaveBeenCalled()
  })

  it('sets class correctly', () => {
    const onFocus = jest.fn()
    const wrapper = createWrapper({ onFocus })
    const input = wrapper.find('TextInput')
    input.simulate('focus')

    expect(wrapper.hasClass('talixo-field--focus')).toEqual(true)
  })
})

describe('onBlur', () => {
  beforeEach(() => {
    resetIdCounter()
  })

  it('is called', () => {
    const onBlur = jest.fn()
    const wrapper = createWrapper({ onBlur })
    const input = wrapper.find('TextInput')
    input.simulate('blur')

    expect(onBlur).toHaveBeenCalled()
  })

  it('sets class correctly', () => {
    const onBlur = jest.fn()
    const wrapper = createWrapper({ onBlur })
    const input = wrapper.find('TextInput')

    expect(wrapper.hasClass('talixo-form-field--focus')).toEqual(false)
    input.simulate('focus')
    input.simulate('blur')
    expect(wrapper.hasClass('talixo-form-field--focus')).toEqual(false)
  })
})
