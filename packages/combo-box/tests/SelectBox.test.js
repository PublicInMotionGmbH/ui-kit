import React from 'react'
import { mount } from 'enzyme'

import Downshift from 'downshift'

import SelectBox from '../src/SelectBox'

describe('<SelectBox />', () => {
  beforeEach(() => Downshift.resetIdCounter())

  it('should render correctly', () => {
    const wrapper = mount(
      <SelectBox />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
