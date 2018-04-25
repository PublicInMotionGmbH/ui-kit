import React from 'react'
import { shallow } from 'enzyme'

import Form from '../src/Form'

describe('<Form />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Form>
        <div>Test children</div>
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should render footer componet correctly', () => {
    const wrapper = shallow(
      <Form footerComponent={<div>Footer</div>}>
        <div>Test children</div>
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
