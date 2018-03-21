import React from 'react'
import { shallow } from 'enzyme'

import MaterialIcon from '../src/MaterialIcon'

describe('<MaterialIcon />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<MaterialIcon name='account_circle' />)

    expect(wrapper).toMatchSnapshot()
  })
})
