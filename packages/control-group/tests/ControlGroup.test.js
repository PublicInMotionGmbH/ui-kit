import React from 'react'
import { shallow } from 'enzyme'

import ControlGroup from '../src/ControlGroup'

describe('<ControlGroup />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <ControlGroup>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </ControlGroup>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders orientation correctly', () => {
    const wrapper = shallow(
      <ControlGroup orientation='vertical'>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </ControlGroup>
    )

    expect(wrapper.props().className).toContain('vertical')
  })

  it('renders position correctly', () => {
    const wrapper = shallow(
      <ControlGroup position='right'>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </ControlGroup>
    )

    expect(wrapper.props().className).toContain('right')
  })
})
