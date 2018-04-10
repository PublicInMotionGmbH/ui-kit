import React from 'react'
import { shallow } from 'enzyme'

import Collapse from '../src/Collapse'

describe('<Collapse />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Collapse>
        There is some content inside
      </Collapse>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
