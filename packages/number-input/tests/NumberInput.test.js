import React from 'react'
import NumberInput from '../src/NumberInput'
import { shallow } from 'enzyme'

describe('<NumberInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<NumberInput />)
    expect(wrapper).toMatchSnapshot()
  })
  describe('adding props', () => {
    let wrapper
    beforeAll(() => { // eslint-disable-line
      wrapper = shallow(<NumberInput className='name' hasError />)
    })
    it('should set className', () => {
      expect(wrapper.instance().props.className).toMatch(/(^| )name( |$)/)
    })

    it('should set hasError', () => {
      expect(wrapper.instance().props.hasError).toBe(true)
    })
  })
})
