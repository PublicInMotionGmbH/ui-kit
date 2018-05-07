import React from 'react'
import TextInput from '../src/TextInput'
import { shallow, mount } from 'enzyme'

import { prefix } from '@talixo/shared'

const name = prefix('text-input')

const setDocumentState = state => Object.defineProperty(document, 'readyState', {
  get: () => state,
  configurable: true
})

describe('<TextInput />', () => {
  it('should render properly', () => {
    const wrapper = shallow(<TextInput />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should have `empty` class when it is empty', () => {
    const wrapper = shallow(<TextInput />)

    expect(wrapper.hasClass(`${name}--empty`)).toBe(true)

    wrapper.setProps({ value: null })
    expect(wrapper.hasClass(`${name}--empty`)).toBe(true)

    wrapper.setProps({ value: '' })
    expect(wrapper.hasClass(`${name}--empty`)).toBe(true)

    wrapper.setProps({ value: 'xyz' })
    wrapper.setProps({ value: '' })
    expect(wrapper.hasClass(`${name}--empty`)).toBe(true)
  })

  it('should not have `empty` class when it is not empty', () => {
    const wrapper = shallow(<TextInput value='abc' />)

    expect(wrapper.hasClass(`${name}--empty`)).toBe(false)
  })

  it('should render something on left', () => {
    const wrapper = shallow(<TextInput />)

    expect(wrapper.find(`.${name}__left`).length).toBe(0)

    wrapper.setProps({ left: 'something' })

    expect(wrapper.find(`.${name}__left`).length).toBe(1)
  })

  it('should add class name with left icon', () => {
    const wrapper = shallow(<TextInput left='something' />)

    expect(wrapper.hasClass(`${name}--with-left`)).toBe(true)

    wrapper.setProps({ left: null })

    expect(wrapper.hasClass(`${name}--with-left`)).toBe(false)
  })

  it('should pass props to input', () => {
    const wrapper = mount(<TextInput type='number' max='5' aria-hidden='true' />)
    const node = wrapper.find('input').getDOMNode()

    expect(node.getAttribute('type')).toBe('number')
    expect(node.getAttribute('max')).toBe('5')
    expect(node.getAttribute('aria-hidden')).toBe('true')
  })

  it('should allow additional class name', () => {
    const wrapper = mount(<TextInput className='abc' />)
    const node = wrapper.getDOMNode()

    expect(node.classList.contains(name)).toBe(true)
    expect(node.classList.contains('abc')).toBe(true)
  })

  it('should render something on right', () => {
    const wrapper = shallow(<TextInput />)

    expect(wrapper.find(`.${name}__right`).length).toBe(0)

    wrapper.setProps({ right: 'something' })

    expect(wrapper.find(`.${name}__right`).length).toBe(1)
  })

  it('should add class name with right icon', () => {
    const wrapper = shallow(<TextInput right='something' />)

    expect(wrapper.hasClass(`${name}--with-right`)).toBe(true)

    wrapper.setProps({ right: null })

    expect(wrapper.hasClass(`${name}--with-right`)).toBe(false)
  })

  it('should handle `onChange` event properly', () => {
    const spy = jest.fn()
    const wrapper = shallow(<TextInput onChange={spy} />)

    wrapper.find('input').simulate('change', {
      target: {
        value: 'abc'
      }
    })

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 'abc' ])
  })

  it('should render with error styling', () => {
    const wrapper = shallow(<TextInput error />)

    expect(wrapper.hasClass(`${name}--error`)).toBe(true)
  })

  it('should render suffix when it is provided', () => {
    const wrapper = shallow(<TextInput suffix='cars' />)

    expect(wrapper.find(`.${name}__suffix`).length).toBe(1)
  })

  it('should add information about suffix to class name', () => {
    const wrapper = shallow(<TextInput suffix='cars' />)

    expect(wrapper.hasClass(`${name}--with-suffix`)).toBe(true)
  })

  describe('when document is not loaded', () => {
    beforeAll(() => setDocumentState('loading'))

    it('should not show suffix', () => {
      const wrapper = mount(<TextInput suffix='abc' />)

      expect(wrapper.find(`.${name}__suffix`).prop('style')).toEqual({
        position: 'absolute',
        pointerEvents: 'none',
        visibility: 'hidden'
      })
    })

    afterAll(() => setDocumentState('complete'))
  })

  describe('after document is loaded', () => {
    beforeAll(() => setDocumentState('complete'))

    it('should show suffix', () => {
      const wrapper = mount(<TextInput suffix='abc' />)

      expect(wrapper.find(`.${name}__suffix`).prop('style').visibility).not.toEqual('hidden')
    })

    afterAll(() => setDocumentState('complete'))
  })

  it('should update padding for input when there is suffix', () => {

  })

  describe('suffix listeners', () => {
    const addEventListener = window.addEventListener
    const removeEventListener = window.removeEventListener

    beforeEach(() => {
      window.addEventListener = jest.fn()
      window.removeEventListener = jest.fn()
    })

    it('should add suffix listeners', () => {
      const wrapper = mount(<TextInput suffix='abc' />)

      expect(window.addEventListener.mock.calls.filter(x => x[0] === 'load').length).toBe(1)
      expect(window.addEventListener.mock.calls.filter(x => x[0] === 'resize').length).toBe(1)

      wrapper.unmount()
    })

    it('should remove suffix listeners on unmount', () => {
      const wrapper = mount(<TextInput suffix='abc' />)

      wrapper.unmount()

      expect(window.removeEventListener.mock.calls.filter(x => x[0] === 'load').length).toBe(1)
      expect(window.removeEventListener.mock.calls.filter(x => x[0] === 'resize').length).toBe(1)
    })

    it('should remove suffix listeners when it is removed from props', () => {
      const wrapper = mount(<TextInput suffix='abc' />)

      wrapper.setProps({ suffix: null })

      expect(window.removeEventListener.mock.calls.filter(x => x[0] === 'load').length).toBe(1)
      expect(window.removeEventListener.mock.calls.filter(x => x[0] === 'resize').length).toBe(1)
    })

    afterAll(() => {
      window.addEventListener = addEventListener
      window.removeEventListener = removeEventListener
    })
  })

  it('should show suffix', () => {
    const wrapper = mount(<TextInput suffix='abc' />)

    expect(wrapper.find(`.${name}__suffix`).prop('style').visibility).not.toEqual('hidden')
  })

  it('should allow adding suffix later through props', () => {
    const wrapper = shallow(<TextInput />)

    wrapper.setProps({ suffix: 'cars' })

    expect(wrapper.find(`.${name}__suffix`).length).toBe(1)
  })

  it('should pass styles to wrapper', () => {
    const wrapper = mount(<TextInput style={{ background: 'red' }} />)

    expect(wrapper.prop('style')).toEqual({
      background: 'red'
    })
  })

  describe('styles', () => {
    let style
    beforeEach(() => {
      style = document.createElement('style')
      style.innerHTML = 'input { font-family: Arial, Roma !important }'
      document.body.appendChild(style)
    })

    it('should use same style for suffix as for input', () => {
      const wrapper = mount(<TextInput suffix='cards' />)

      expect(wrapper.find(`.${name}__suffix`).prop('style').fontFamily).toBe('Arial, Roma')
    })

    afterEach(() => document.body.removeChild(style))
  })
})
