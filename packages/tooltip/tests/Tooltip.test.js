import React from 'react'
import Tooltip from '../src/Tooltip'
import { mount, shallow } from 'enzyme'
import { prefix } from '@talixo/shared'

const name = prefix('tooltip')

describe('<Tooltip />', () => {
  it('renders children correctly', () => {
    const wrapper = mount(
      <Tooltip position='left' render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders render when hovered', () => {
    const wrapper = mount(
      <Tooltip position='left' render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )
    wrapper.find(`.${name}-target`).simulate('mouseOver')

    expect(wrapper.contains(<span>Left</span>)).toBe(true)
    wrapper.unmount()
  })

  it('renders position correctly', () => {
    const wrapper = mount(
      <Tooltip position='top' render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )
    wrapper.find(`.${name}-target`).simulate('mouseOver')

    expect(wrapper.find(`.${name}`).hasClass(`${name}--top`)).toBe(true)
    wrapper.unmount()
  })

  it('renders .big correctly', () => {
    const wrapper = mount(
      <Tooltip position='left' className='big' render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )
    wrapper.find(`.${name}-target`).simulate('mouseOver')

    expect(wrapper.find(`.${name}`).hasClass('big')).toBe(true)
    wrapper.unmount()
  })

  it('renders fade correctly', () => {
    const wrapper = mount(
      <Tooltip position='left' fade render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )
    wrapper.find(`.${name}-target`).simulate('mouseOver')

    expect(wrapper.find(`.${name}`).prop('style').transition).toBeDefined()
    wrapper.unmount()
  })

  it('renders fadeTime correctly', () => {
    const wrapper = mount(
      <Tooltip position='left' fade fadeTime={1200} render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )
    wrapper.find(`.${name}-target`).simulate('mouseOver')

    expect(wrapper.find(`.${name}`).prop('style').transition).toContain('opacity 1200ms')
    wrapper.unmount()
  })

  it('renders render when open is set to true', () => {
    const wrapper = mount(
      <Tooltip position='left' open render={() => <span>Left</span>}>
        <span className={`${name}-target`}>Tooltip</span>
      </Tooltip>
    )

    expect(wrapper.contains(<span>Left</span>)).toBe(true)
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
})
