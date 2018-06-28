import React from 'react'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import Dots from '../src/Dots'

const name = prefix('carousel-dots')

describe('<Dots />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Dots slides={[
      [ <div>Slide 1</div> ],
      [ <div>Slide 2</div> ],
      [ <div>Slide 3</div> ]
    ]} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders children correctly for different amount of elements per slide', () => {
    const wrapper = shallow(<Dots perPage={2} slides={[
      [ <div>Slide 1</div>, <div>Slide 2</div> ],
      [ <div>Slide 3</div>, <div>Slide 4</div> ]
    ]} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('handles onChange event correctly', () => {
    const spy = jest.fn()

    const wrapper = shallow(<Dots onChange={spy} slides={[
      [ <div>Slide 1</div> ],
      [ <div>Slide 2</div> ],
      [ <div>Slide 3</div> ]
    ]} />)

    wrapper.find(`.${name}__dot`).at(0).simulate('click')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(0)
    spy.mockReset()

    wrapper.find(`.${name}__dot`).at(2).simulate('click')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(2)
    spy.mockReset()
  })

  it('handles onChange event correctly with different perPage', () => {
    const spy = jest.fn()

    const wrapper = shallow(<Dots onChange={spy} perPage={2} slides={[
      [ <div>Slide 1</div>, <div>Slide 2</div> ],
      [ <div>Slide 3</div>, <div>Slide 4</div> ]
    ]} />)

    wrapper.find(`.${name}__dot`).at(0).simulate('click')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(0)
    spy.mockReset()

    wrapper.find(`.${name}__dot`).at(1).simulate('click')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(2)
  })

  it('should mark active slide correctly', () => {
    const wrapper = shallow(<Dots value={1} slides={[
      [ <div>Slide 1</div> ],
      [ <div>Slide 2</div> ],
      [ <div>Slide 3</div> ]
    ]} />)

    expect(wrapper.find(`.${name}__dot`).at(0).hasClass(`${name}__dot--active`)).toBe(false)
    expect(wrapper.find(`.${name}__dot`).at(1).hasClass(`${name}__dot--active`)).toBe(true)
    expect(wrapper.find(`.${name}__dot`).at(2).hasClass(`${name}__dot--active`)).toBe(false)

    wrapper.setProps({ value: 0 })

    expect(wrapper.find(`.${name}__dot`).at(0).hasClass(`${name}__dot--active`)).toBe(true)
    expect(wrapper.find(`.${name}__dot`).at(1).hasClass(`${name}__dot--active`)).toBe(false)
    expect(wrapper.find(`.${name}__dot`).at(2).hasClass(`${name}__dot--active`)).toBe(false)
  })

  it('should mark active slide correctly for different perPage', () => {
    const wrapper = shallow(<Dots value={1} perPage={2} slides={[
      [ <div>Slide 1</div>, <div>Slide 2</div> ],
      [ <div>Slide 3</div>, <div>Slide 4</div> ],
      [ <div>Slide 5</div>, <div>Slide 6</div> ]
    ]} />)

    expect(wrapper.find(`.${name}__dot`).at(0).hasClass(`${name}__dot--active`)).toBe(false)
    expect(wrapper.find(`.${name}__dot`).at(1).hasClass(`${name}__dot--active`)).toBe(true)
    expect(wrapper.find(`.${name}__dot`).at(2).hasClass(`${name}__dot--active`)).toBe(false)

    wrapper.setProps({ value: 0 })

    expect(wrapper.find(`.${name}__dot`).at(0).hasClass(`${name}__dot--active`)).toBe(true)
    expect(wrapper.find(`.${name}__dot`).at(1).hasClass(`${name}__dot--active`)).toBe(false)
    expect(wrapper.find(`.${name}__dot`).at(2).hasClass(`${name}__dot--active`)).toBe(false)
  })
})
