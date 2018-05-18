import React from 'react'
import { mount } from 'enzyme'

import { FormField } from '@talixo/form-field'
import { TextInput } from '@talixo/text-input'

import { isFormField } from '../src/FormHandler'

describe('isFormField', () => {
  it('should return true if component is FormField', () => {
    const wrapper = mount(<FormField><TextInput /></FormField>)
    expect(isFormField(wrapper.get(0))).toBe(true)
  })

  it('should return false if component is not FormField', () => {
    const wrapper = mount(<TextInput />)
    expect(isFormField(wrapper.get(0))).toBe(false)
  })
})
