import React from 'react'
import { shallow, mount } from 'enzyme'

import RadioGroup from '../src/RadioGroup'

describe('<RadioGroup />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<RadioGroup name='RadioGroup' options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should pass prop name to input', () => {
    const wrapper = mount(<RadioGroup name='RadioGroup1' options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]} />)

    expect(wrapper.find('RadioInput').first().prop('name')).toBe('RadioGroup1')
  })

  it('should pass prop options to input', () => {
    const wrapper = mount(<RadioGroup name='RadioGroup2' options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]} />)

    expect(wrapper.find('RadioInput').first().prop('value')).toBe(1)
  })

  it('should set default option', () => {
    const wrapper = mount(<RadioGroup name='RadioGroup3' value={2} options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]} />)

    let RadioInput = wrapper.find('RadioInput')

    expect(RadioInput.at(0).prop('defaultChecked')).toBe(false)
    expect(RadioInput.at(1).prop('defaultChecked')).toBe(true)
    expect(RadioInput.at(2).prop('defaultChecked')).toBe(false)
  })

  it('should set as disabled appropriate options', () => {
    const wrapper = mount(<RadioGroup name='RadioGroup4' options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]} disabled={[1, 3]} />)

    let RadioInput = wrapper.find('RadioInput')

    expect(RadioInput.at(0).prop('disabled')).toBe(true)
    expect(RadioInput.at(1).prop('disabled')).toBe(false)
    expect(RadioInput.at(2).prop('disabled')).toBe(true)
  })

  it('should render label correctly', () => {
    const wrapper = mount(<RadioGroup name='RadioGroup5' options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]} />)

    expect(wrapper.find('RadioInput').at(1).find('span').text()).toEqual('two')
  })
})
