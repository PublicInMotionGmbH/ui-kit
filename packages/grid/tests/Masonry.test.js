import React from 'react'
import Masonry from '../src/Masonry'
import Group from '../src/Group'
import Segment from '../src/Segment'
import { shallow } from 'enzyme'

describe('<Group />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Masonry>
        <Group>
          <Segment>12</Segment>
        </Group>
      </Masonry>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('turns into Segment properly', () => {
    const wrapper = shallow(
      <Group>
        <Masonry size={3}>
          <Group>
            <Segment size={3}>3 of 3/12</Segment>
            <Segment size={9}>9 of 3/12</Segment>
          </Group>
        </Masonry>
      </Group>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('turns into Segment properly with any props', () => {
    const wrapper = shallow(
      <Group>
        <Masonry size={12} medium={6} large={3} xlarge={3}>
          <Group>
            <Segment>12/6/3</Segment>
          </Group>
        </Masonry>
        <Masonry size={12} medium={6} large={9} xlarge={9}>
          <Group>
            <Segment>12/6/9</Segment>
          </Group>
        </Masonry>
      </Group>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('allows custom class names', () => {
    const wrapper = shallow(
      <Masonry className='abc'>
        <Group>
          <Segment>12</Segment>
        </Group>
      </Masonry>
    )

    expect(wrapper.props().className).toMatch(/(^| )abc( |$)/)
    expect(wrapper.props().className).not.toBe('abc')
  })
})
