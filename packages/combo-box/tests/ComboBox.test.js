import React from 'react'
import { mount } from 'enzyme'

import Downshift from 'downshift'

import ComboBox from '../src/ComboBox'

describe('<ComboBox />', () => {
  beforeEach(() => Downshift.resetIdCounter())

  it('should render correctly', () => {
    const wrapper = mount(
      <ComboBox />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
