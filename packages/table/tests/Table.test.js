import React from 'react'
import Table from '../src/Table'
import { shallow } from 'enzyme'

describe('<Table />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Table />)

    expect(wrapper).toMatchSnapshot()
  })
})
