import React from 'react'
import Group from '../src/Group'
import Segment from '../src/Segment'
import { shallow } from 'enzyme'

describe('<Group />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Group>
        <Segment>12</Segment>
      </Group>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('turns into Segment properly', () => {
    const wrapper = shallow(
      <Group>
        <Group size={3}>
          <Segment>3</Segment>
        </Group>
        <Group size={9}>
          <Segment>9</Segment>
        </Group>
      </Group>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('turns into Segment properly with any props', () => {
    const wrapper = shallow(
      <Group>
        <Group size={12} medium={6} large={3} xlarge={3}>
          <Segment>12/6/3</Segment>
        </Group>
        <Group size={12} medium={6} large={9} xlarge={9}>
          <Segment>12/6/9</Segment>
        </Group>
      </Group>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('handles `spaced `prop`', () => {
    const wrapper = shallow(
      <Group spaced>
        <Segment>3</Segment>
        <Segment>9</Segment>
      </Group>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('allows custom class names', () => {
    const wrapper = shallow(
      <Group className='abc'>
        <Segment>12</Segment>
      </Group>
    )

    expect(wrapper.props().className).toMatch(/(^| )abc( |$)/)
    expect(wrapper.props().className).not.toBe('abc')
  })
})
