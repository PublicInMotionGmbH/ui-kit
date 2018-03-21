import React from 'react'
import { shallow } from 'enzyme'

import TalixoIcon from '../src/TalixoIcon'

describe('<TalixoIcon />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<TalixoIcon name='affiliate' />)

    expect(wrapper).toMatchSnapshot()
  })
})
