import React from 'react'
import RadioInput from '../src/RadioInput'
import { shallow } from 'enzyme'

describe('<RadioInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<RadioInput />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('when passing props', () => {
    const props = {
      onChange: jest.fn(),
      name: 'gender'
    }
    let wrapper, input

    beforeAll(() => {
      wrapper = shallow(<RadioInput {...props}>Radio label</RadioInput>)
      input = wrapper.find('input[type="radio"]')
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
