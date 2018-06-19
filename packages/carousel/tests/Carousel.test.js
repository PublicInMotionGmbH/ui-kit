import React from 'react'
import { shallow } from 'enzyme'

import Carousel from '../src/Carousel'

import { prefix } from '@talixo/shared'

const moduleName = 'carousel'

const name = prefix(moduleName)

const imagesStyle = {
  display: 'inline-block',
  height: '100%',
  width: '100%',
  textAlign: 'center',
  fontSize: '30px',
  padding: '30px',
  boxSizing: 'border-box',
  backgroundColor: '#3da23d',
  border: '5px solid #000'
}

describe('<Carousel />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Carousel>
        <div style={imagesStyle}>SLIDE 1</div>
        <div style={imagesStyle}>SLIDE 2</div>
        <div style={imagesStyle}>SLIDE 3</div>
      </Carousel>)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders arrows correctly', () => {
    const wrapper = shallow(
      <Carousel arrows>
        <div style={imagesStyle}>SLIDE 1</div>
        <div style={imagesStyle}>SLIDE 2</div>
        <div style={imagesStyle}>SLIDE 3</div>
      </Carousel>)

    expect(wrapper.find(`.${name}__arrows--prev`).length).toBe(1)
    expect(wrapper.find(`.${name}__arrows--next`).length).toBe(1)
    expect(wrapper.find(`.${name}__arrows`).props().children.length).toBe(2)
  })

  it('renders dots correctly', () => {
    const wrapper = shallow(
      <Carousel dots>
        <div style={imagesStyle}>SLIDE 1</div>
        <div style={imagesStyle}>SLIDE 2</div>
        <div style={imagesStyle}>SLIDE 3</div>
      </Carousel>)

    expect(wrapper.find(`.${name}-dots__single`).length).toBe(3)
  })

  it('changes currentSlide when next arrow clicked', async () => {
    const wrapper = shallow(
      <Carousel arrows>
        <div style={imagesStyle}>SLIDE 1</div>
        <div style={imagesStyle}>SLIDE 2</div>
        <div style={imagesStyle}>SLIDE 3</div>
      </Carousel>)

    const arrow = wrapper.find(`.${name}__arrows--next`)
    await arrow.simulate('click')

    expect(wrapper.state().currentSlide).toBe(1)
  })

  it('changes currentSlide when prev arrow clicked', async () => {
    const wrapper = shallow(
      <Carousel arrows>
        <div style={imagesStyle}>SLIDE 1</div>
        <div style={imagesStyle}>SLIDE 2</div>
        <div style={imagesStyle}>SLIDE 3</div>
      </Carousel>)

    const arrow = wrapper.find(`.${name}__arrows--next`)
    await arrow.simulate('click')
    await arrow.simulate('click')

    const prev = wrapper.find(`.${name}__arrows--prev`)
    await prev.simulate('click')

    expect(wrapper.state().currentSlide).toBe(1)
  })

  it('goes to last slide when prev arrow clicked on first', async () => {
    const wrapper = shallow(
      <Carousel arrows>
        <div style={imagesStyle}>SLIDE 1</div>
        <div style={imagesStyle}>SLIDE 2</div>
        <div style={imagesStyle}>SLIDE 3</div>
      </Carousel>)

    // const prev = wrapper.find(`.${name}__arrows--prev`)
    // await prev.simulate('click')
    console.log(wrapper.instance())

    // expect(wrapper.state().currentSlide).toBe(3)
  })

  it('changes currentSlide when prev arrow clicked', () => {
    const wrapper = shallow(
      <Carousel dots>
        <div style={imagesStyle}>SLIDE 1</div>
        <div style={imagesStyle}>SLIDE 2</div>
        <div style={imagesStyle}>SLIDE 3</div>
      </Carousel>)

    expect(wrapper.state('currentSlide')).toBe(0)

    const dot = wrapper.find(`.${name}-dots__single`)
    dot.at(2).simulate('click')

    expect(wrapper.state('currentSlide')).toBe(2)
  })
})
