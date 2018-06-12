import React from 'react'
import { shallow } from 'enzyme'

import TextareaAutosize from 'react-textarea-autosize'

import Textarea from '../src/Textarea'

describe('<Textarea />', () => {
  it('renders textarea correctly', () => {
    const wrapper = shallow(<Textarea />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders as textarea correctly', () => {
    const wrapper = shallow(<Textarea />)

    expect(wrapper.html()).toMatch(/<textarea/)
  })

  it('renders default className correctly', () => {
    const wrapper = shallow(<Textarea />)

    expect(wrapper.prop('className')).toBe('talixo-textarea')
  })

  it('renders resize disabled className correctly', () => {
    const wrapper = shallow(<Textarea resize={false} />)

    expect(wrapper.prop('className')).toBe('talixo-textarea talixo-textarea--no-resize')
  })

  it('renders disabled className correctly', () => {
    const wrapper = shallow(<Textarea disabled />)

    expect(wrapper.prop('className')).toBe('talixo-textarea talixo-textarea--disabled')
  })

  it('renders as TextareaAutosize correctly', () => {
    const wrapper = shallow(<Textarea TextareaComponent={TextareaAutosize} />)

    expect(wrapper.find('TextareaAutosize')).toHaveLength(1)
  })
})
