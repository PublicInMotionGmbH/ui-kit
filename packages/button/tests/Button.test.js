import React from 'react'

import Button from '../src/Button'
import { shallow } from 'enzyme'

describe('<Button />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Button>
        Button
      </Button>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
