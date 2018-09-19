import React from 'react'
import { shallow } from 'enzyme'

import Pane from '../src/Pane'

describe('<Pane />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Pane>
        <div>LEFT SIDE</div>
      </Pane>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should handle build styles', () => {
    const wrapper = shallow(
      <Pane>
        <div>LEFT SIDE</div>
      </Pane>
    )
    expect(wrapper.instance().buildStyle(20, 'vertical')).toEqual({ height: '20%', width: 'false%' })
  })
})
