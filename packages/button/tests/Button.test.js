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

  it('handles `size` properly', () => {
    const wrapper = shallow(
      <Button size='small'>
        Button
      </Button>
    )

    expect(wrapper.props().className).toMatch(/(^| )talixo-button--small( |$)/)
  })

  it('handles `variant` properly', () => {
    const wrapper = shallow(
      <Button variant='full-width'>
        Button
      </Button>
    )

    expect(wrapper.props().className).toMatch(/(^| )talixo-button--full-width( |$)/)
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
      <Button type='button'>
        Button
      </Button>
    )

    expect(wrapper.props().type).toBe('button')
  })
})
