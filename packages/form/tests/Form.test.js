import React from 'react'
import { shallow } from 'enzyme'

import Form from '../src/Form'

describe('<Form />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Form />)

    expect(wrapper).toMatchSnapshot()
  })
})
