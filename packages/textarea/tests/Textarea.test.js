import React from 'react'
import { mount, shallow, render } from 'enzyme'

import TextareaAutosize from 'react-textarea-autosize'

import { prefix } from '@talixo/shared'

import Textarea from '../src/Textarea'

const moduleName = prefix('textarea')

describe('<Textarea />', () => {
  it('renders textarea correctly', () => {
    const wrapper = shallow(<Textarea />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders as textarea correctly', () => {
    const wrapper = render(<Textarea />)

    expect(wrapper[0].type).toBe('tag')
    expect(wrapper[0].name).toBe('textarea')
  })

  it('renders default className correctly', () => {
    const wrapper = shallow(<Textarea />)

    expect(wrapper.prop('className')).toBe(`${moduleName}`)
  })

  it('renders resize disabled className correctly', () => {
    const wrapper = shallow(<Textarea resize={false} />)

    expect(wrapper.hasClass(moduleName)).toBe(true)
    expect(wrapper.hasClass(`${moduleName}--no-resize`)).toBe(true)
  })

  it('renders disabled className correctly', () => {
    const wrapper = shallow(<Textarea disabled />)

    expect(wrapper.hasClass(moduleName)).toBe(true)
    expect(wrapper.hasClass(`${moduleName}--disabled`)).toBe(true)
  })

  it('renders as TextareaAutosize correctly', () => {
    const wrapper = shallow(<Textarea TextareaComponent={TextareaAutosize} />)

    expect(wrapper.find(TextareaAutosize)).toHaveLength(1)
  })

  it('should pass unknown keys to textarea', () => {
    const wrapper = shallow(<Textarea maxLength={6} />)

    expect(wrapper.prop('maxLength')).toBe(6)
  })

  it('should correctly handle changes', () => {
    const spy = jest.fn()
    const wrapper = mount(<Textarea onChange={spy} />)

    wrapper.find('textarea').simulate('change', { target: { value: 'abc' } })

    expect(spy).toHaveBeenCalledWith('abc', expect.anything())
    expect(wrapper.find('textarea').prop('value')).toBe('abc')
  })

  it('should correctly control from outside', () => {
    const spy = jest.fn()
    const wrapper = mount(<Textarea onChange={spy} value='def' />)

    wrapper.find('textarea').simulate('change', { target: { value: 'abc' } })

    expect(spy).toHaveBeenCalledWith('abc', expect.anything())
    expect(wrapper.find('textarea').prop('value')).toBe('def')

    wrapper.setProps({ value: 'abc' })

    expect(wrapper.find('textarea').prop('value')).toBe('abc')
  })
})
