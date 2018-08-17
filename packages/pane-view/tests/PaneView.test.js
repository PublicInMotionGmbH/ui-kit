import React from 'react'
import { shallow } from 'enzyme'

import PaneView from '../src/PaneView'

describe('<PaneView />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<PaneView />)

    expect(wrapper).toMatchSnapshot()
  })
})
