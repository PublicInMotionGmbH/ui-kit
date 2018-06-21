import React from 'react'
import { shallow } from 'enzyme'

import Dots from '../src/Dots'

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
    const wrapper = shallow(<Dots slides={[
      [ <div>Slide 1</div>, <div>Slide 2</div> ],
      [ <div>Slide 3</div>, <div>Slide 4</div> ]
    ]} />)

    expect(wrapper).toMatchSnapshot()
  })
})
