import React from 'react'
import { shallow } from 'enzyme'

import Fieldset from '../src/Fieldset'

describe('<Fieldset />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Fieldset />)

    expect(wrapper).toMatchSnapshot()
  })

  it('passes prop legend correctly', () => {
    const wrapper = shallow(<Fieldset legend='Personal info' />)

    expect(wrapper.find('.talixo-fieldset__legend').text()).toBe('Personal info')
  })
})
