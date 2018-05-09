import React from 'react'
import { mount } from 'enzyme'

import { FormField } from '@talixo/form-field'

import { isFormField } from '../src/FormHandler'

describe('isFormField', () => {
  it('should return true if component is FormField', () => {
    const wrapper = mount(<FormField><input type='text' /></FormField>)
    expect(isFormField(wrapper.get(0))).toBe(true)
  })

  it('should return false if component is not FormField', () => {
    const wrapper = mount(<input type='text' />)
    expect(isFormField(wrapper.get(0))).toBe(false)
  })
})
