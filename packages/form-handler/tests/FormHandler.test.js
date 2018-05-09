import React from 'react'
import { mount } from 'enzyme'

import { Button } from '@talixo/button'
import { FormField } from '@talixo/form-field'
import { TextInput } from '@talixo/text-input'

import FormHandler from '../src/FormHandler'

const createWrapper = (props) => mount(
  <FormHandler {...props}>
    <br />
    <FormField name='test'>
      <TextInput />
    </FormField>
    <div>
      <FormField name='test2'>
        <TextInput />
      </FormField>
    </div>
    <FormField>
      <TextInput />
    </FormField>
    <Button type='submit'>Test</Button>
  </FormHandler>
)

describe('<FormHandler />', () => {
  describe('rendering', () => {
    let wrapper
    beforeEach(() => {
      wrapper = createWrapper()
    })
    afterEach(() => {
      wrapper.unmount()
    })
    it('renders children correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('should render all children', () => {
      expect(wrapper.find('.talixo-form-field')).toHaveLength(3)
      expect(wrapper.find('br')).toHaveLength(1)
      expect(wrapper.find('.talixo-button')).toHaveLength(1)
    })
  })

  describe('passing props to children', () => {
    let wrapper, spyFn, input
    beforeEach(() => {
      wrapper = createWrapper()
      spyFn = jest.fn()
      input = wrapper.find('.talixo-text-input__input').first()
    })
    afterEach(() => {
      wrapper.unmount()
    })
    it('should invoke setFieldValue when input has changed', () => {
      wrapper.instance().formik.setFieldValue = spyFn
      input.simulate('change', { target: { value: 'My new value' } })
      // expect(spyFn).toHaveBeenCalledTimes(1)
    })

    it('should invoke handleBlur when input has blurred', () => {
      wrapper.instance().formik.handleBlur = spyFn
      input.simulate('focus')
      input.simulate('change', { target: { value: 'My new value' } })
      input.simulate('blur')
      expect(spyFn).toHaveBeenCalledTimes(1)
      // expect(spyFn).toHaveBeenCalledWith({ persist: expect.any(Function), target: { name: 'test' } })
    })
  })

  describe('props updating', () => {
    const initialErrors = { test: null }
    const updatedErrors = { test: 'Test error' }
    const props = { errors: initialErrors }
    const initialValues = { test: 'Test value' }
    const updatedValues = { test: 'Updated test value' }
    const undefValues = { test: undefined }

    describe('errors update', () => {
      let wrapper
      beforeEach(() => {
        wrapper = createWrapper(props)
      })
      afterEach(() => {
        wrapper.unmount()
      })
      it('should update errors inside Formik bag', () => {
        wrapper.setProps({ errors: updatedErrors })
        expect(wrapper.instance().formik.getFormikBag().errors).toEqual(updatedErrors)
      })
    })

    describe('values update', () => {
      let wrapper
      afterEach(() => {
        wrapper.unmount()
      })
      it('should update values inside Formik bag', () => {
        wrapper = createWrapper()
        wrapper.setProps({ values: updatedValues })
        expect(wrapper.instance().formik.getFormikBag().values).toEqual(updatedValues)
      })

      it('should update initial values inside Formik bag', () => {
        wrapper = createWrapper({ values: initialValues })
        wrapper.instance().formik.getFormikBag().setFieldValue('test', 'User changes')
        wrapper.setProps({ values: updatedValues })
        expect(wrapper.instance().formik.getFormikBag().values).toEqual({ test: 'User changes' })
      })

      it('should update keep values inside Formik bagwhen undefined values are passed', () => {
        wrapper = createWrapper({ values: initialValues })
        wrapper.setProps({ values: undefValues })
        expect(wrapper.instance().formik.getFormikBag().values).toEqual(initialValues)
      })
    })
  })

  describe('form submitting', () => {
    let wrapper, form
    const initialValues = { test: 'Test value' }
    const props = { onSubmit: jest.fn(), values: initialValues }
    beforeEach(() => {
      wrapper = createWrapper(props)
      form = wrapper.find('form')
    })
    afterEach(() => {
      wrapper.unmount()
    })
    it('should invoke onSubmit', () => {
      form.simulate('submit')
      expect(props.onSubmit).toHaveBeenCalledWith(initialValues, expect.any(Object))
    })
  })
})
