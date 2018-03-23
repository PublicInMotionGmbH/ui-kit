import React from 'react'
import TextInput from '../src/TextInput'
import { shallow } from 'enzyme'

describe('<TextInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<TextInput />)

    expect(wrapper).toMatchSnapshot()
  })
})
