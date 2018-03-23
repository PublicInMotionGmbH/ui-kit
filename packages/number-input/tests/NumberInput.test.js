import React from 'react'
import NumberInput from '../src/NumberInput'
import { shallow } from 'enzyme'

describe('<NumberInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<NumberInput />)
    expect(wrapper).toMatchSnapshot()
  })
  it('renders .name correctly', () => {
    const wrapper = shallow(<NumberInput className='name' />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders errors correctly', () => {
    const wrapper = shallow(<NumberInput errors={['error1']} />)
    expect(wrapper).toMatchSnapshot()
  })
})
