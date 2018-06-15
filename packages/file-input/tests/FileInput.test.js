import React from 'react'
import { shallow } from 'enzyme'

import FileInput from '../src/FileInput'

describe('<FileInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<FileInput />)

    expect(wrapper).toMatchSnapshot()
  })
})
