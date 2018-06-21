import React from 'react'
import { shallow } from 'enzyme'

import Dots from '../src/Dots'
import Carousel from '../src/Carousel'

describe('<Dots />', () => {
  it('renders children correctly', () => {
    const wrapperCarousel = shallow(
      <Carousel>
        <div>SLIDE 1</div>
        <div>SLIDE 2</div>
        <div>SLIDE 3</div>
      </Carousel>)

    const children = wrapperCarousel.props().children

    const wrapper = shallow(<Dots children={children} perPage={1} />)

    expect(wrapper).toMatchSnapshot()
  })
})
