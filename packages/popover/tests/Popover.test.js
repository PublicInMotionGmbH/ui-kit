import React from 'react'
import Popover from '../src/Popover'
import { mount } from 'enzyme'

describe('<Popover />', () => {
  const rectElement = { ...window.Element.prototype.getBoundingClientRect }

  beforeAll(() => {
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

  afterAll(() => {
    window.Element.prototype.getBoundingClientRect = rectElement
  })

  it('renders children correctly', () => {
    const div = global.document.createElement('div')
    global.document.body.appendChild(div)
    const wrapper = mount(
      <div>
        <button id='popover-id'>click me</button>
        <Popover target='#popover-id' open position='left'>
          <span>Popover</span>
        </Popover>
      </div>,
      { attachTo: div }
    )

    expect(wrapper).toMatchSnapshot()
    wrapper.detach()
    wrapper.unmount()
  })

  it('renders .big correctly', () => {
    const div = global.document.createElement('div')
    global.document.body.appendChild(div)

    const wrapper = mount(
      <div>
        <button id='popover-id'>click me</button>
        <Popover target='#popover-id' open position='left' className='big'>
          <span>Popover</span>
        </Popover>
      </div>,
      { attachTo: div }
    )

    expect(wrapper).toMatchSnapshot()
    wrapper.detach()
    wrapper.unmount()
  })

  it('renders .fade correctly', () => {
    const div = global.document.createElement('div')
    global.document.body.appendChild(div)

    const wrapper = mount(
      <div>
        <button id='popover-id'>click me</button>
        <Popover target='#popover-id' open position='left' fade>
          <span>Popover</span>
        </Popover>
      </div>,
      { attachTo: div }
    )

    expect(wrapper).toMatchSnapshot()
    wrapper.detach()
    wrapper.unmount()
  })

  it('renders fadeTime correctly', () => {
    const div = global.document.createElement('div')
    global.document.body.appendChild(div)

    const wrapper = mount(
      <div>
        <button id='popover-id'>click me</button>
        <Popover target='#popover-id' open position='left' fade fadeTime={1200}>
          <span>Popover</span>
        </Popover>
      </div>,
      { attachTo: div }
    )

    expect(wrapper).toMatchSnapshot()
    wrapper.detach()
    wrapper.unmount()
  })
})
