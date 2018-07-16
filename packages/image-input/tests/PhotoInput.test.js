import React from 'react'
import { shallow } from 'enzyme'

import ImageInput from '../src/ImageInput'

describe('<ImageInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<ImageInput />)

    expect(wrapper).toMatchSnapshot()
  })
})
