import React from 'react'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import Arrows from '../src/Arrows'

const name = prefix('carousel-arrows')

describe('<Arrows />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Arrows />)

    expect(wrapper).toMatchSnapshot()
  })

  it('handles onBack event correctly', () => {
    const back = jest.fn()
    const forward = jest.fn()

    const wrapper = shallow(<Arrows onBack={back} onForward={forward} />)

    wrapper.find(`.${name}__arrow--back`).simulate('click')

    expect(back).toHaveBeenCalledTimes(1)
    expect(forward).toHaveBeenCalledTimes(0)
  })

  it('handles onForward event correctly', () => {
    const back = jest.fn()
    const forward = jest.fn()

    const wrapper = shallow(<Arrows onBack={back} onForward={forward} />)

    wrapper.find(`.${name}__arrow--forward`).simulate('click')

    expect(back).toHaveBeenCalledTimes(0)
    expect(forward).toHaveBeenCalledTimes(1)
  })
})
