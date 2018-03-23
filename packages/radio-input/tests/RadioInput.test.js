import React from 'react'
import RadioInput from '../src/RadioInput'
import { shallow } from 'enzyme'

describe('<RadioInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<RadioInput />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders name correctly', () => {
    const wrapper = shallow(<RadioInput name='gender'>Radio label</RadioInput>)
    expect(wrapper).toMatchSnapshot()
  })
})
