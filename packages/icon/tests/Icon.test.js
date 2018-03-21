import React from 'react'
import { shallow } from 'enzyme'

import Icon from '../src/Icon'

describe('<Icon />', () => {
  it('renders Material icon correctly', () => {
    const wrapper = shallow(<Icon name='account_circle' />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders Talixo icon correctly', () => {
    const wrapper = shallow(<Icon name='affiliate' />)

    expect(wrapper).toMatchSnapshot()
  })
})
