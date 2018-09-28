import React from 'react'
import { shallow } from 'enzyme'

import HowItWorks from '../src/HowItWorks'

const image = <img />

const description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dignissimos laudantium nam saepe sunt suscipit?'

const steps = [
  { title: 'Title 1', description, image },
  { title: 'Title 2', description, image },
  { title: 'Title 3', description, image },
  { title: 'Title 4', description, image },
  { title: 'Title 5', description, image },
  { title: 'Title 6', description, image },
  { title: 'Title 7', description, image },
  { title: 'Title 8', description, image },
  { title: 'Title 9', description, image },
  { title: 'Title 10', description, image },
  { title: 'Title 11', description, image },
  { title: 'Title 12', description, image },
  { title: 'Title 13', description, image },
  { title: 'Title 14', description, image }
]

describe('<HowItWorks />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<HowItWorks steps={steps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
