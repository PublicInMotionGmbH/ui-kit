import React from 'react'
import { shallow, mount } from 'enzyme'

import Carousel from '../src/Carousel'

import { prefix } from '@talixo/shared'

const moduleName = 'carousel'

const name = prefix(moduleName)

describe('<Carousel />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Carousel>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders arrows correctly', () => {
    const wrapper = shallow(
      <Carousel arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>)

    expect(wrapper.find(`.${name}__arrow--prev`).length).toBe(1)
    expect(wrapper.find(`.${name}__arrow--next`).length).toBe(1)
  })

  it('renders dots correctly', () => {
    const wrapper = shallow(
      <Carousel dots>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>)

    expect(wrapper.find(`.${name}-dots__dot`).length).toBe(3)
  })

  it('changes currentSlide when prev arrow clicked', () => {
    const wrapper = shallow(
      <Carousel dots>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>)

    expect(wrapper.state('currentSlide')).toBe(0)

    const dot = wrapper.find(`.${name}-dots__dot`)
    dot.at(2).simulate('click')

    expect(wrapper.state('currentSlide')).toBe(2)
  })

  it('changes currentSlide when next arrow clicked', async () => {
    const wrapper = shallow(
      <Carousel arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>)

    const arrow = wrapper.find(`.${name}__arrow--next`)
    await arrow.simulate('click')

    expect(wrapper.state().currentSlide).toBe(1)
  })

  it('changes currentSlide when prev arrow clicked', async () => {
    const wrapper = mount(
      <Carousel arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>)

    const arrow = wrapper.find(`.${name}__arrow--next`)
    await arrow.simulate('click')
    await arrow.simulate('click')

    const prev = wrapper.find(`.${name}__arrow--prev`)
    await prev.simulate('click')

    expect(wrapper.state().currentSlide).toBe(1)

    wrapper.unmount()
  })

  it('set ref to wrapper correctly', () => {
    const wrapper = mount(
      <Carousel arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>)

    expect(wrapper.find(`.${name}__wrapper`)).toHaveLength(1)
    expect(wrapper.instance().wrapper).toBeTruthy()

    wrapper.unmount()
  })

  it('goes to last slide when prev arrow clicked on first', () => {
    const wrapper = mount(
      <Carousel arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>)

    expect(wrapper.state().currentSlide).toBe(0)

    const prev = wrapper.find(`.${name}__arrow--prev`)
    prev.simulate('click')

    expect(wrapper.state().currentSlide).toBe(3)

    wrapper.unmount()
  })

  it('goes to last slide when prev arrow clicked on first, in case perPage is greater than number of children', () => {
    const wrapper = mount(
      <Carousel arrows perPage={4}>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>)

    expect(wrapper.state().currentSlide).toBe(0)

    const prev = wrapper.find(`.${name}__arrow--prev`)
    prev.simulate('click')

    expect(wrapper.state().currentSlide).toBe(6)

    wrapper.unmount()
  })
})
