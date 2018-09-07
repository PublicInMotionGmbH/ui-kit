import React from 'react'
import { shallow, mount } from 'enzyme'

import CarouselAutoplay from '../src/CarouselAutoplay'
import Carousel from '../src/Carousel'

describe('<Carousel />', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('renders children correctly', () => {
    const wrapper = shallow(
      <CarouselAutoplay>
        <Carousel>
          <div>SLIDE 1</div>
          <div>SLIDE 2</div>
          <div>SLIDE 3</div>
        </Carousel>
      </CarouselAutoplay>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should pass initial slide to Carousel inside', () => {
    const wrapper = shallow(
      <CarouselAutoplay initialSlide={2}>
        <Carousel>
          <div>SLIDE 1</div>
          <div>SLIDE 2</div>
          <div>SLIDE 3</div>
        </Carousel>
      </CarouselAutoplay>
    )

    expect(wrapper.find(Carousel).prop('value')).toBe(2)
  })

  it('should change movement type', () => {
    const wrapper = shallow(
      <CarouselAutoplay movement='exact'>
        <Carousel>
          <div>SLIDE 1</div>
          <div>SLIDE 2</div>
          <div>SLIDE 3</div>
        </Carousel>
      </CarouselAutoplay>
    )

    expect(wrapper.find(Carousel).prop('defaultMovement')).toBe('exact')
  })

  it('should use Carousel value as default initialValue', () => {
    const wrapper = shallow(
      <CarouselAutoplay movement='exact'>
        <Carousel value={2}>
          <div>SLIDE 1</div>
          <div>SLIDE 2</div>
          <div>SLIDE 3</div>
        </Carousel>
      </CarouselAutoplay>
    )

    expect(wrapper.find(Carousel).prop('value')).toBe(2)
  })

  it('should go to next slide after specified interval', () => {
    const wrapper = mount(
      <CarouselAutoplay interval={111} movement='exact'>
        <Carousel>
          <div>SLIDE 1</div>
          <div>SLIDE 2</div>
          <div>SLIDE 3</div>
        </Carousel>
      </CarouselAutoplay>
    )

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(1)

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(2)

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(0)
  })

  it('should go to previous slide with movement set to \'back\' after specified interval', () => {
    const wrapper = mount(
      <CarouselAutoplay interval={111} movement='back'>
        <Carousel>
          <div>SLIDE 1</div>
          <div>SLIDE 2</div>
          <div>SLIDE 3</div>
        </Carousel>
      </CarouselAutoplay>
    )

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(2)

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(1)

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(0)
  })

  it('should use perPage as step by default', () => {
    const wrapper = mount(
      <CarouselAutoplay interval={111} movement='exact'>
        <Carousel perPage={2}>
          <div>SLIDE 1</div>
          <div>SLIDE 2</div>
          <div>SLIDE 3</div>
        </Carousel>
      </CarouselAutoplay>
    )

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(2)

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(1)

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(0)
  })

  it('should work with custom step', () => {
    const wrapper = mount(
      <CarouselAutoplay step={1} interval={111} movement='exact'>
        <Carousel perPage={2}>
          <div>SLIDE 1</div>
          <div>SLIDE 2</div>
          <div>SLIDE 3</div>
        </Carousel>
      </CarouselAutoplay>
    )

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(1)

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(2)

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(0)
  })

  it('should not listen after unmount', () => {
    const wrapper = mount(
      <CarouselAutoplay interval={111} movement='exact'>
        <Carousel>
          <div>SLIDE 1</div>
          <div>SLIDE 2</div>
          <div>SLIDE 3</div>
        </Carousel>
      </CarouselAutoplay>
    )

    const instance = wrapper.instance()
    wrapper.unmount()

    jest.runTimersToTime(111)
    wrapper.update()

    expect(instance.state.value).toBe(0)
  })

  it('should handle change on child Carousel properly', () => {
    const wrapper = mount(
      <CarouselAutoplay interval={111} movement='exact'>
        <Carousel>
          <div>SLIDE 1</div>
          <div>SLIDE 2</div>
          <div>SLIDE 3</div>
        </Carousel>
      </CarouselAutoplay>
    )

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(1)

    expect(typeof wrapper.find(Carousel).prop('onChange')).toBe('function')

    wrapper.find(Carousel).prop('onChange')(0)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(0)

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(1)

    jest.runTimersToTime(111)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(2)
  })

  it('should allow setting onChange event on Carousel anyway', () => {
    const spy = jest.fn()

    const wrapper = shallow(
      <CarouselAutoplay movement='exact'>
        <Carousel onChange={spy}>
          <div>SLIDE 1</div>
          <div>SLIDE 2</div>
          <div>SLIDE 3</div>
        </Carousel>
      </CarouselAutoplay>
    )

    expect(typeof wrapper.find(Carousel).prop('onChange')).toBe('function')
    wrapper.find(Carousel).prop('onChange')(2)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(2)
  })

  it('should handle movement change', () => {
    const wrapper = shallow(
      <CarouselAutoplay>
        <Carousel infinite>
          <div>SLIDE 1</div>
          <div>SLIDE 2</div>
          <div>SLIDE 3</div>
        </Carousel>
      </CarouselAutoplay>
    )

    expect(wrapper.find(Carousel).prop('defaultMovement')).toBe('forward')

    wrapper.setProps({ movement: 'exact' })

    expect(wrapper.find(Carousel).prop('defaultMovement')).toBe('exact')
  })

  it('should reset tick on interval change', () => {
    const wrapper = mount(
      <CarouselAutoplay interval={100}>
        <Carousel>
          <div>SLIDE 1</div>
          <div>SLIDE 2</div>
          <div>SLIDE 3</div>
        </Carousel>
      </CarouselAutoplay>
    )

    jest.runTimersToTime(100)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(1)

    jest.runTimersToTime(50)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(1)

    wrapper.setProps({ interval: 1000 })

    jest.runTimersToTime(50)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(1)

    jest.runTimersToTime(950)
    wrapper.update()

    expect(wrapper.find(Carousel).prop('value')).toBe(2)
  })
})
