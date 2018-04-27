import React from 'react'
import { mount } from 'enzyme'

import Downshift from 'downshift'

import AutoComplete from '../src/AutoComplete'

describe('<AutoComplete />', () => {
  beforeEach(() => Downshift.resetIdCounter())

  it('should render correctly', () => {
    const wrapper = mount(
      <AutoComplete>
        <input type='email' />
      </AutoComplete>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
