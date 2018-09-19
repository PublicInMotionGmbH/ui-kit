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
    const wrapper = shallow(
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

    wrapper.find('Resizer').simulate('mousedown', {
      nativeEvent: {
        clientX: 200,
        clientY: 200
      }
    })

    document.dispatchEvent(new window.MouseEvent('mouseup', {
      clientX: 222,
      clientY: 222
    }))

    expect(wrapper.state('mode')).toBe('stop')
  })

  it('handle conversion to percentage', () => {
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

    expect(wrapper.instance().convertToPercent(700, 1400)).toBe(50)
  })

  it('handle conversion to percentage with extreme dimensions', () => {
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

    expect(wrapper.instance().convertToPercent(1600, 1400)).toBe(100)
    expect(wrapper.instance().convertToPercent(-10, 1400)).toBe(0)
  })

  it('handle mouse move horizontal', () => {
    const wrapper = mount(
      <PaneView split='horizontal'>
        <Pane>
          <div>LEFT SIDE</div>
        </Pane>
        <Pane>
          <div>RIGHT SIDE</div>
        </Pane>
      </PaneView>
    )

    wrapper.find('Resizer').simulate('mousedown', {
      nativeEvent: {
        clientX: 200,
        clientY: 200
      }
    })

    document.dispatchEvent(new window.MouseEvent('mousemove', {
      clientX: 222,
      clientY: 222
    }))

    expect(wrapper.state('mode')).toBe('resize')
  })

  it('handle mouse move vertical', () => {
    const wrapper = mount(
      <PaneView split='vertical'>
        <Pane>
          <div>LEFT SIDE</div>
        </Pane>
        <Pane>
          <div>RIGHT SIDE</div>
        </Pane>
      </PaneView>
    )

    wrapper.find('Resizer').simulate('mousedown', {
      nativeEvent: {
        clientX: 200,
        clientY: 200
      }
    })

    document.dispatchEvent(new window.MouseEvent('mousemove', {
      clientX: 222,
      clientY: 222
    }))

    expect(wrapper.state('mode')).toBe('resize')
  })

  it('handle mouse move with onMouseDown', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <PaneView onMouseDown={spy} split='horizontal'>
        <Pane>
          <div>LEFT SIDE</div>
        </Pane>
        <Pane>
          <div>RIGHT SIDE</div>
        </Pane>
      </PaneView>
    )

    wrapper.find('Resizer').simulate('mousedown')
    wrapper.find('Resizer').simulate('mouseup')
    wrapper.find('Resizer').simulate('mousedown')

    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('should handle defualt sizes', () => {
    const wrapper = shallow(
      <PaneView split='horizontal'>
        <Pane defaultSize={20}>
          <div>LEFT SIDE</div>
        </Pane>
        <Pane>
          <div>RIGHT SIDE</div>
        </Pane>
      </PaneView>
    )

    expect(wrapper.find(Pane).at(0).prop('size')).toBe(20)
    expect(wrapper.find(Pane).at(1).prop('size')).toBe(80)
  })
})
