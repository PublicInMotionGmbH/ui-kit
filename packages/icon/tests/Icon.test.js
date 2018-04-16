import React from 'react'
import { shallow } from 'enzyme'

import Icon from '../src/Icon'

const TALIXO_EXAMPLE = 'affiliate'
const MATERIAL_EXAMPLE = 'account_circle'

describe('<Icon />', () => {
  it('renders Material icon correctly', () => {
    const wrapper = shallow(<Icon name={MATERIAL_EXAMPLE} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders Talixo icon correctly', () => {
    const wrapper = shallow(<Icon name={TALIXO_EXAMPLE} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('handles properly additional classes for Talixo icon', () => {
    const wrapper = shallow(<Icon name={TALIXO_EXAMPLE} className='abc' />).dive()

    expect(wrapper.props().className).toMatch(/(^| )abc( |$)/)
    expect(wrapper.props().className).not.toBe('abc')
  })

  it('handles properly additional properties for Talixo icon', () => {
    const wrapper = shallow(<Icon name={TALIXO_EXAMPLE} id='def' className='abc' />)

    expect(wrapper.props().id).toBe('def')
  })

  it('handles properly additional classes for Material icon', () => {
    const wrapper = shallow(<Icon name={MATERIAL_EXAMPLE} className='abc' />).dive()

    expect(wrapper.props().className).toMatch(/(^| )abc( |$)/)
    expect(wrapper.props().className).not.toBe('abc')
  })

  it('handles properly additional properties for Material icon', () => {
    const wrapper = shallow(<Icon name={MATERIAL_EXAMPLE} id='def' className='abc' />)

    expect(wrapper.props().id).toBe('def')
  })
})
