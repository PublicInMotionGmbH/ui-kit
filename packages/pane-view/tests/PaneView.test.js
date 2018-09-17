import React from 'react'
import { shallow, mount } from 'enzyme'

import PaneView from '../src/PaneView'
import Pane from '../src/Pane'

describe('<PaneView />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <PaneView>
        <Pane>
          <div>LEFT SIDE</div>
        </Pane>
        <Pane>
          <div>RIGHT SIDE</div>
        </Pane>
      </PaneView>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('handle mouse down', () => {
    const wrapper = shallow(
      <PaneView>
        <Pane>
          <div>LEFT SIDE</div>
        </Pane>
        <Pane>
          <div>RIGHT SIDE</div>
        </Pane>
      </PaneView>
    )

    wrapper.find('Resizer').simulate('mouseDown')

    expect(wrapper.state('mode')).toBe('start')
  })

  it('handle prop onMouseDown', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <PaneView onMouseDown={spy}>
        <Pane>
          <div>LEFT SIDE</div>
        </Pane>
        <Pane>
          <div>RIGHT SIDE</div>
        </Pane>
      </PaneView>
    )

    wrapper.find('Resizer').simulate('mouseDown')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual(['start'])

    wrapper.instance().handleMouseUp()

    expect(spy.mock.calls.length).toBe(2)
    expect(spy.mock.calls[1]).toEqual(['stop'])
  })

  it('should handle mouse up', () => {
    const wrapper = shallow(
      <PaneView>
        <Pane>
          <div>LEFT SIDE</div>
        </Pane>
        <Pane>
          <div>RIGHT SIDE</div>
        </Pane>
      </PaneView>
    )

    wrapper.instance().handleMouseUp()

    expect(wrapper.state('mode')).toBe('stop')
  })
})
