import React from 'react'
import { shallow } from 'enzyme'

import DataTable from '../src/DataTable'

describe('<DataTable />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<DataTable />)

    expect(wrapper).toMatchSnapshot()
  })
})
