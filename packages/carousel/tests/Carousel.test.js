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
      </Carousel>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders arrows correctly', () => {
    const wrapper = shallow(
      <Carousel arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.find(`.${name}__arrow--prev`).length).toBe(1)
    expect(wrapper.find(`.${name}__arrow--next`).length).toBe(1)
  })

  it('renders dots correctly', () => {
    const wrapper = shallow(
      <Carousel dots>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.find(`.${name}-dots__dot`).length).toBe(3)
  })

  it('changes currentSlide when prev arrow clicked', () => {
    const wrapper = shallow(
      <Carousel dots>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

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
      </Carousel>
    )

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
      </Carousel>
    )

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
      </Carousel>
    )

    expect(wrapper.find(`.${name}__wrapper`)).toHaveLength(1)
    expect(wrapper.instance().wrapper).toBeTruthy()

    wrapper.unmount()
  })

  it('goes to first slide from the last one (with different perPage than 1)', () => {
    const wrapper = mount(
      <Carousel perPage={2} value={2} arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.state().currentSlide).toBe(2)

    wrapper.setProps({ value: 0 })

    expect(wrapper.state().currentSlide).toBe(0)

    wrapper.unmount()
  })

  it('goes to last slide when prev arrow clicked on first', () => {
    const wrapper = mount(
      <Carousel arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

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
      </Carousel>
    )

    expect(wrapper.state().currentSlide).toBe(0)

    const prev = wrapper.find(`.${name}__arrow--prev`)
    prev.simulate('click')

    expect(wrapper.state().currentSlide).toBe(6)

    wrapper.unmount()
  })

  it('should not change automatically a controlled carousel', () => {
    const wrapper = mount(
      <Carousel value={0} arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.state().currentSlide).toBe(0)

    const prev = wrapper.find(`.${name}__arrow--prev`)
    prev.simulate('click')

    expect(wrapper.state().currentSlide).toBe(0)
  })

  it('should change a controlled carousel', () => {
    const wrapper = mount(
      <Carousel value={0} arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.state().currentSlide).toBe(0)

    wrapper.setProps({ value: 1 })

    expect(wrapper.state().currentSlide).toBe(1)
  })

  it('should get back to last slide when amount of carousel slides is smaller', () => {
    const wrapper = mount(
      <Carousel value={2} arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.state().currentSlide).toBe(2)

    wrapper.setProps({
      children: [
        <div>SLIDE 1</div>,
        <div>SLIDE 2</div>
      ]
    })

    expect(wrapper.state().currentSlide).toBe(1)
  })

  it('should not change slide when amount of children has increased', () => {
    const wrapper = mount(
      <Carousel value={2} arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.state().currentSlide).toBe(2)

    wrapper.setProps({
      children: [
        <div>SLIDE 1</div>,
        <div>SLIDE 2</div>,
        <div>SLIDE 3</div>,
        <div>SLIDE 4</div>
      ]
    })

    expect(wrapper.state().currentSlide).toBe(2)
  })

  it('should change animation time when it\'s changed in props', () => {
    const wrapper = mount(
      <Carousel value={2} animationTime={500}>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.state().transitionTime).toBe(500)

    wrapper.setProps({
      animationTime: 300
    })

    expect(wrapper.state().transitionTime).toBe(300)
  })

  it('should use `forward` movement on controlled component, when it was the last one', async () => {
    const wrapper = mount(
      <Carousel value={1} arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    const next = wrapper.find(`.${name}__arrow--next`)
    next.simulate('click')

    // Mock 'change' function in component
    const instance = wrapper.instance()
    const change = jest.fn(instance.change.bind(instance))
    let result = null

    instance.change = (...args) => {
      result = change(...args)

      return result
    }

    wrapper.setProps({ value: 2 })

    expect(change).toHaveBeenCalledWith(2, 'forward', true)

    // Wait until everything behind in component will work
    await result

    expect(wrapper.state().currentSlide).toBe(2)
  })

  it('should not call onChange event when it is changed from outside', async () => {
    const spy = jest.fn()

    const wrapper = mount(
      <Carousel value={1} onChange={spy} arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    wrapper.setProps({ value: 2 })

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should call onChange event when it is called from inside (controlled)', async () => {
    const spy = jest.fn()

    const wrapper = mount(
      <Carousel value={1} onChange={spy} arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    const next = wrapper.find(`.${name}__arrow--next`)
    next.simulate('click')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(2, 'forward')
  })

  it('should not call onChange event when it is called from inside and later changed (controlled)', async () => {
    const spy = jest.fn()

    const wrapper = mount(
      <Carousel value={1} onChange={spy} arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    const next = wrapper.find(`.${name}__arrow--next`)
    next.simulate('click')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(2, 'forward')
    spy.mockReset()

    // Mock 'change' function in component
    const instance = wrapper.instance()
    const change = jest.fn(instance.change.bind(instance))
    let result = null

    instance.change = (...args) => {
      result = change(...args)

      return result
    }

    wrapper.setProps({ value: 2 })

    // Wait until everything behind in component will work
    await result

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should call onChange event when it is called from inside (self-controlled)', async () => {
    const spy = jest.fn()

    const wrapper = mount(
      <Carousel onChange={spy} arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    const next = wrapper.find(`.${name}__arrow--next`)
    next.simulate('click')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(1, 'forward')
  })
})
