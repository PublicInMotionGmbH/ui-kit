import React from 'react'

import Button from '../src/Button'
import { shallow } from 'enzyme'

describe('<Button />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Button>
        Button
      </Button>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('handles `small` properly', () => {
    const wrapper = shallow(
      <Button small>
        Button
      </Button>
    )

    expect(wrapper.props().className).toMatch(/(^| )talixo-button--small( |$)/)
  })

  it('handles `fluid` properly', () => {
    const wrapper = shallow(
      <Button fluid>
        Button
      </Button>
    )

    expect(wrapper.props().className).toMatch(/(^| )talixo-button--fluid( |$)/)
  })

  it('handles `className` properly', () => {
    const wrapper = shallow(
      <Button className='anything'>
        Button
      </Button>
    )

    expect(wrapper.props().className).toMatch(/(^| )anything( |$)/)
  })

  it('handles different `button` props properly', () => {
    const wrapper = shallow(
      <Button name='something'>
        Button
      </Button>
    )

    expect(wrapper.props().name).toBe('something')
  })

  it('handles `submit` prop', () => {
    const wrapper = shallow(
      <Button submit>
        Button
      </Button>
    )

    expect(wrapper.props().type).toBe('submit')

    wrapper.setProps({ submit: false })
    expect(wrapper.props().type).toBe('button')
  })

  it('handles additional props', () => {
    const wrapper = shallow(
      <Button disabled>
        Button
      </Button>
    )

    expect(wrapper.props().disabled).toBe(true)
  })
})
