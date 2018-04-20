import React from 'react'
import NumberInput from '../src/NumberInput'
import { shallow } from 'enzyme'

describe('<NumberInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<NumberInput />)

    expect(wrapper).toMatchSnapshot()
  })
})
