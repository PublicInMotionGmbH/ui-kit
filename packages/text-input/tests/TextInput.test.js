import React from 'react'
import TextInput from '../src/TextInput'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/commons'

const moduleName = prefix('text-input')

const createProps = (props = {}) => ({
  hasError: false,
  size: '',
  onChange: () => {},
  placeholder: 'Test',
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<TextInput {...props} />)

describe('<TextInput />', () => {
  let wrapper, props

  describe('when rendered', () => {
    beforeAll(() => {
      props = createProps({ className: 'test', hasError: true })
      wrapper = createWrapper(props)
    })

    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when props are passed', () => {
    beforeAll(() => {
      props = createProps({ className: 'test', hasError: true, placeholder: 'test' })
      wrapper = createWrapper(props)
    })

    it('should render placeholder correctly', () => {
      expect(wrapper.instance().props.placeholder).toMatch(/^test$/)
    })

    it('should render .test correctly', () => {
      expect(wrapper.instance().props.className).toMatch(/(^| )test( |$)/)
    })

    it('should have hasError prop set to true', () => {
      expect(wrapper.instance().props.hasError).toBe(true)
    })
  })

  describe('when user types inside input', () => {
    let input
    const onChange = jest.fn()

    beforeEach(() => {
      wrapper = shallow(<TextInput placeholder='Test' onChange={onChange} />)
      input = wrapper.find(`.${moduleName}`)
      input.simulate('change', { target: { value: 'Test' } })
    })

    it('should call onChange', () => {
      expect(onChange).toHaveBeenCalled()
    })

    it('should update state', () => {
      expect(wrapper.state().inputValue).toEqual('Test')
    })

    it(`should add .${`${moduleName}__label--not-empty`} to label`, () => {
      expect(wrapper.find('label').hasClass(`${moduleName}__label--not-empty`)).toBe(true)
    })

    it(`should remove .${`${moduleName}__label--not-empty`} when input is empty`, () => {
      input.simulate('change', { target: { value: '' } })
      expect(wrapper.find('label').hasClass(`${moduleName}__label--not-empty`)).toBe(false)
    })
  })
})
