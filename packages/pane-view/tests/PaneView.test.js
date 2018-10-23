import React from 'react'
import { shallow, mount } from 'enzyme'

import PaneView from '../src/PaneView'
import Pane from '../src/Pane'
import { convertToPercent } from '../utils/utils'

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

    wrapper.find('Resizer').simulate('mousedown')

    expect(wrapper.state('current')).toBe(0)
  })

  it('handle prop onResize', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <PaneView onResize={spy}
      >
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
      clientX: 322,
      clientY: 322
    }))

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0][0]).toBe(0)
    expect(spy.mock.calls[0][1]).toEqual({'height': 0, 'width': 0})
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

    wrapper.find('Resizer').simulate('mousedown')
    expect(wrapper.state('current')).toBe(0)

    document.dispatchEvent(new window.MouseEvent('mouseup'))
    expect(wrapper.state('current')).toBe(null)
  })

  it('handle conversion to percentage', () => {
    expect(convertToPercent(700, 1400)).toBe(50)
  })

  it('handle conversion to percentage with extreme dimensions', () => {
    expect(convertToPercent(1600, 1400)).toBe(100)
    expect(convertToPercent(-10, 1400)).toBe(0)
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

    expect(wrapper.state('currentSizeHorizontal')).toBe(undefined)

    document.dispatchEvent(new window.MouseEvent('mousemove', {
      clientX: 222,
      clientY: 222
    }))

    expect(wrapper.state('currentSizeHorizontal')).toBe(222)

    document.dispatchEvent(new window.MouseEvent('mousemove', {
      clientX: 270,
      clientY: 270
    }))

    expect(wrapper.state('currentSizeHorizontal')).toBe(270)

    wrapper.unmount()
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

    expect(wrapper.state('currentSizeVertical')).toBe(undefined)

    document.dispatchEvent(new window.MouseEvent('mousemove', {
      clientX: 222,
      clientY: 222
    }))

    expect(wrapper.state('currentSizeVertical')).toBe(222)

    document.dispatchEvent(new window.MouseEvent('mousemove', {
      clientX: 299,
      clientY: 299
    }))

    expect(wrapper.state('currentSizeVertical')).toBe(299)

    wrapper.unmount()
  })

  it('handle mousedown with onDragStart', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <PaneView onDragStart={spy} split='horizontal'>
        <Pane>
          <div>LEFT SIDE</div>
        </Pane>
        <Pane>
          <div>RIGHT SIDE</div>
        </Pane>
      </PaneView>
    )

    wrapper.find('Resizer').simulate('mousedown')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy.mock.calls[0][0]).toBe(0)

    wrapper.unmount()
  })

  it('handle mouseup with onDragStop', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <PaneView onDragStop={spy} split='horizontal'>
        <Pane>
          <div>LEFT SIDE</div>
        </Pane>
        <Pane>
          <div>RIGHT SIDE</div>
        </Pane>
      </PaneView>
    )

    wrapper.find('Resizer').simulate('mousedown')
    document.dispatchEvent(new window.MouseEvent('mouseup'))

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy.mock.calls[0][0]).toBe(0)

    wrapper.unmount()
  })

  it('handle mouse move with onDragResize', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <PaneView onDragResize={spy} split='horizontal'>
        <Pane>
          <div>LEFT SIDE</div>
        </Pane>
        <Pane>
          <div>RIGHT SIDE</div>
        </Pane>
      </PaneView>
    )

    wrapper.find('Resizer').simulate('mousedown')
    document.dispatchEvent(new window.MouseEvent('mousemove', {
      clientX: 299,
      clientY: 299
    }))
    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.unmount()
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
