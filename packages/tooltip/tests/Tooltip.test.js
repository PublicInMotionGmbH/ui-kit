import React from 'react'
import Tooltip from '../src/Tooltip'
import { mount, shallow } from 'enzyme'
import { prefix } from '@talixo/shared'

const name = prefix('tooltip')

function dispatchEvent (element, eventName, mouse) {
  const Event = mouse ? window.MouseEvent : window.Event

  element.dispatchEvent(new Event(eventName))
}

describe('<Tooltip />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    window.Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 100,
        height: 50,
        top: 50,
        left: 50,
        bottom: 0,
        right: 0
      }
    })
  })
  afterEach(() => jest.useRealTimers())

  it('renders children correctly', () => {
    const wrapper = mount(
      <Tooltip position='left' render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    expect(wrapper).toMatchSnapshot()
    jest.runAllTimers()
    wrapper.unmount()
  })

  it('renders render when hovered', () => {
    const wrapper = mount(
      <Tooltip position='left' render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    dispatchEvent(wrapper.find(`.${name}-target`).getDOMNode(), 'mouseover', true)
    wrapper.update()

    expect(wrapper.contains(<span>Left</span>)).toBe(true)

    jest.runAllTimers()
    wrapper.unmount()
  })

  it('show tooltip when mouseenter', () => {
    const wrapper = mount(
      <Tooltip position='left' render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    dispatchEvent(wrapper.find(`.${name}-target`).getDOMNode(), 'mouseenter', true)
    wrapper.update()

    expect(wrapper.contains(<span>Left</span>)).toBe(true)
    jest.runAllTimers()
    wrapper.unmount()
  })

  it('hide tooltip when mouseleave', () => {
    const wrapper = mount(
      <Tooltip position='left' render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    dispatchEvent(wrapper.find(`.${name}-target`).getDOMNode(), 'mouseover', true)
    wrapper.update()
    jest.runAllTimers()

    dispatchEvent(wrapper.find(`.${name}-target`).getDOMNode(), 'mouseleave', true)
    jest.runAllTimers()
    wrapper.update()

    expect(wrapper.contains(<span>Left</span>)).toBe(false)
    jest.runAllTimers()
    wrapper.unmount()
  })

  it('renders render when clicked', () => {
    const wrapper = mount(
      <Tooltip position='left' triggerOn='click' render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    dispatchEvent(wrapper.find(`.${name}-target`).getDOMNode(), 'click', true)
    wrapper.update()

    expect(wrapper.contains(<span>Left</span>)).toBe(true)
    jest.runAllTimers()
    wrapper.unmount()
  })

  it('not render when triggerOn is not `click` when clicked', () => {
    const wrapper = mount(
      <Tooltip position='left' triggerOn='hover' render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    dispatchEvent(wrapper.find(`.${name}-target`).getDOMNode(), 'click', true)
    wrapper.update()

    expect(wrapper.contains(<span>Left</span>)).toBe(false)
    jest.runAllTimers()
    wrapper.unmount()
  })

  it('renders position correctly', () => {
    const wrapper = mount(
      <Tooltip position='top' render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    dispatchEvent(wrapper.find(`.${name}-target`).getDOMNode(), 'mouseover', true)
    wrapper.update()

    expect(wrapper.find(`.${name}`).hasClass(`${name}--top`)).toBe(true)
    jest.runAllTimers()
    wrapper.unmount()
  })

  it('renders .big correctly', () => {
    const wrapper = mount(
      <Tooltip position='left' className='big' render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    dispatchEvent(wrapper.find(`.${name}-target`).getDOMNode(), 'mouseover', true)
    wrapper.update()

    expect(wrapper.find(`.${name}`).hasClass('big')).toBe(true)
    jest.runAllTimers()
    wrapper.unmount()
  })

  it('renders fade correctly', () => {
    const wrapper = mount(
      <Tooltip position='left' fade render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    dispatchEvent(wrapper.find(`.${name}-target`).getDOMNode(), 'mouseover', true)
    wrapper.update()

    expect(wrapper.find(`.${name}`).prop('style').transition).toBeDefined()
    jest.runAllTimers()
    wrapper.unmount()
  })

  it('renders fadeTime correctly', () => {
    const wrapper = mount(
      <Tooltip position='left' fade fadeTime={1200} render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    dispatchEvent(wrapper.find(`.${name}-target`).getDOMNode(), 'mouseover', true)
    wrapper.update()

    expect(wrapper.find(`.${name}`).prop('style').transition).toContain('opacity 1200ms')
    jest.runAllTimers()
    wrapper.unmount()
  })

  it('renders render when open is set to true', () => {
    const wrapper = mount(
      <Tooltip position='left' open render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    expect(wrapper.contains(<span>Left</span>)).toBe(true)
    jest.runAllTimers()
    wrapper.unmount()
  })

  it('disables event handlers when open is set to true', () => {
    const wrapper = mount(
      <Tooltip position='left' open render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )
    wrapper.find(`.${name}-target`).simulate('click')

    expect(wrapper.contains(<span>Left</span>)).toBe(true)
    jest.runAllTimers()
    wrapper.unmount()
  })

  it('throws error when multiple children are proivided', () => {
    const wrapper = () => shallow(
      <Tooltip position='left' open render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    expect(wrapper).toThrow()
  })

  it('update position correctly', () => {
    const wrapper = mount(
      <Tooltip position='left' open render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    wrapper.setProps({position: 'right'})

    expect(wrapper.prop('position')).toBe('right')
    jest.runAllTimers()
    wrapper.unmount()
  })

  it('update state open correctly', () => {
    const wrapper = mount(
      <Tooltip position='left' open render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    wrapper.setProps({open: false})

    expect(wrapper.prop('open')).toBe(false)
    jest.runAllTimers()
    wrapper.unmount()
  })

  it('update state open correctly', () => {
    const wrapper = mount(
      <Tooltip position='left' open render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    wrapper.setProps({open: false})

    expect(wrapper.prop('open')).toBe(false)
    jest.runAllTimers()
    wrapper.unmount()
  })
})
