import React from 'react'
import { shallow } from 'enzyme'

import ProgressBar from '../src/ProgressBar'

describe('<ProgressBar />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<ProgressBar />)

    expect(wrapper).toMatchSnapshot()
  })
})
