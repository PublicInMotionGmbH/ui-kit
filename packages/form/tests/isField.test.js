import React from 'react'
import { mount } from 'enzyme'

import { TextInput } from '@talixo/text-input'

import isField from '../src/isField'
import Field from '../src/Field'

describe('isFormField', () => {
  it('should return true if component is FormField', () => {
    const wrapper = mount(<Field><TextInput /></Field>)
    expect(isField(wrapper.get(0))).toBe(true)
  })

  it('should return false if component is not FormField', () => {
    const wrapper = mount(<TextInput />)
    expect(isField(wrapper.get(0))).toBe(false)
  })
})
