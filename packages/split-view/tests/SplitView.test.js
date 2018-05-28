import React from 'react'
import { shallow } from 'enzyme'

import SplitView from '../src/SplitView'

describe('<SplitView />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<SplitView />)
    console.log(wrapper)
    // expect(wrapper).toMatchSnapshot()
  })
})
