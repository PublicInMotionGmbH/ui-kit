import React from 'react'
import { shallow, mount } from 'enzyme'

import Carousel from '../src/Carousel'
import Arrows from '../src/Arrows'
import Dots from '../src/Dots'

import { prefix } from '@talixo/shared'

const moduleName = 'carousel'

const name = prefix(moduleName)

function Custom () {
  return <div />
}

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

  it('renders children correctly with infinite', () => {
    const wrapper = shallow(
      <Carousel infinite>
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

    expect(wrapper.find(Arrows).length).toBe(1)
    expect(wrapper.find(Dots).length).toBe(0)
  })

  it('renders dots correctly', () => {
    const wrapper = shallow(
      <Carousel dots>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.find(Dots).length).toBe(1)
    expect(wrapper.find(Arrows).length).toBe(0)
  })

  it('renders both arrows and dots correctly', () => {
    const wrapper = shallow(
      <Carousel arrows dots>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.find(Arrows).length).toBe(1)
    expect(wrapper.find(Dots).length).toBe(1)
  })

  it('renders custom arrows correctly', () => {
    const wrapper = shallow(
      <Carousel arrows renderArrows={Custom}>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.find(Custom).length).toBe(1)
  })

  it('renders custom dots correctly', () => {
    const wrapper = shallow(
      <Carousel dots renderDots={Custom}>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.find(Custom).length).toBe(1)
  })

  it('renders both custom dots and arrows correctly', () => {
    const wrapper = shallow(
      <Carousel dots renderDots={Custom} arrows renderArrows={Custom}>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.find(Custom).length).toBe(2)
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

    wrapper.find(Dots).prop('onChange')(2)

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

    await wrapper.find(Arrows).prop('onForward')()

    expect(wrapper.state().currentSlide).toBe(1)
  })

  it('doesn\'t change currentSlide when it is the last one and next arrow is clicked', () => {
    const wrapper = shallow(
      <Carousel arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    wrapper.setState({ currentSlide: 2 })

    const onForward = wrapper.find(Arrows).prop('onForward')

    expect(onForward).toEqual()
  })

  it('changes currentSlide when it is the last one, infinite is set to true and next arrow is clicked', async () => {
    const wrapper = shallow(
      <Carousel infinite arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    wrapper.setState({ currentSlide: 2 })

    await wrapper.find(Arrows).prop('onForward')()

    expect(wrapper.state().currentSlide).toBe(3)
  })

  it('changes currentSlide when prev arrow is clicked', async () => {
    const wrapper = mount(
      <Carousel arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )
    wrapper.setState({ currentSlide: 2 })

    await wrapper.find(Arrows).prop('onBack')()

    expect(wrapper.state().currentSlide).toBe(1)

    wrapper.unmount()
  })

  it('doesn\'t change currentSlide when it is the first one prev arrow is clicked', () => {
    const wrapper = mount(
      <Carousel arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    const onBack = wrapper.find(Arrows).prop('onBack')

    expect(onBack).toBe()

    wrapper.unmount()
  })

  it('changes currentSlide when it is the first one, infinite is set to true and prev arrow is clicked', async () => {
    const wrapper = mount(
      <Carousel infinite arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    await wrapper.find(Arrows).prop('onBack')()

    expect(wrapper.state().currentSlide).toBe(2)

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

  it('goes to last slide when infinite is set to true and prev arrow clicked on first', () => {
    const wrapper = mount(
      <Carousel infinite arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.state().currentSlide).toBe(0)

    wrapper.find(Arrows).prop('onBack')()

    expect(wrapper.state().currentSlide).toBe(3)

    wrapper.unmount()
  })

  it('goes to last slide when infinite is set to true and prev arrow clicked on first, in case perPage is greater than number of children', () => {
    const wrapper = mount(
      <Carousel infinite arrows perPage={4}>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.state().currentSlide).toBe(0)

    wrapper.find(Arrows).prop('onBack')()

    expect(wrapper.state().currentSlide).toBe(6)

    wrapper.unmount()
  })

  it('keeps on first slide when next arrow clicked on last, infinite is set to true and perPage is greater than number of children', () => {
    const wrapper = mount(
      <Carousel infinite arrows perPage={4}>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.state().currentSlide).toBe(0)

    wrapper.find(Arrows).prop('onForward')()

    expect(wrapper.state().currentSlide).toBe(0)

    wrapper.unmount()
  })

  it('goes to first slide when next arrow clicked on last', async () => {
    const wrapper = mount(
      <Carousel arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.state().currentSlide).toBe(0)

    await wrapper.find(Arrows).prop('onForward')()
    await wrapper.find(Arrows).prop('onForward')()

    expect(wrapper.state().currentSlide).toBe(2)

    await wrapper.find(Arrows).prop('onForward')()
    expect(wrapper.state().currentSlide).toBe(3)

    wrapper.unmount()
  })

  it('calls correct onChange when next arrow clicked on last', async () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Carousel onChange={spy} arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(spy).toHaveBeenCalledTimes(0)

    await wrapper.find(Arrows).prop('onForward')()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(1, 'forward')
    spy.mockReset()

    await wrapper.find(Arrows).prop('onForward')()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(2, 'forward')
    spy.mockReset()

    await wrapper.find(Arrows).prop('onForward')()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(0, 'forward')

    wrapper.unmount()
  })

  it('should not change automatically a controlled carousel', () => {
    const wrapper = mount(
      <Carousel value={1} arrows>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>
    )

    expect(wrapper.state().currentSlide).toBe(1)

    wrapper.find(Arrows).prop('onBack')()

    expect(wrapper.state().currentSlide).toBe(1)
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

    await wrapper.find(Arrows).prop('onForward')()

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

    await wrapper.find(Arrows).prop('onForward')()

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

    await wrapper.find(Arrows).prop('onForward')()

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

    await wrapper.find(Arrows).prop('onForward')()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(1, 'forward')
  })
})
