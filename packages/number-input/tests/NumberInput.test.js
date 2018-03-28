import React from 'react'
import NumberInput from '../src/NumberInput'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

const moduleName = prefix('number-input')

describe('<NumberInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<NumberInput />)
    expect(wrapper).toMatchSnapshot()
  })
  describe('adding props', () => {
    let wrapper, input
    beforeAll(() => { // eslint-disable-line
      wrapper = shallow(<NumberInput className='name' hasError />)
      input = wrapper.find('input')
    })
    it('should set className', () => {
      expect(input.props().className).toMatch(/(^| )name( |$)/)
    })

    it(`should set class ${moduleName}--error to wrapper`, () => {
      expect(wrapper.props().className).toMatch(/(^| )talixo-number-input--error( |$)/)
    })
  })
})
