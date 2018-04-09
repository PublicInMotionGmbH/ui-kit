import React from 'react'
import ControlledTabs from '../src/ControlledTabs'
import { mount } from 'enzyme'

describe('<ControlledTabs />', () => {
  it('renders active tab correctly', () => {
    const wrapper = mount(<ControlledTabs activeTab={1} labels={[1, 4, 6]} />)

    const pageTwo = wrapper.children().get(1)
    expect(pageTwo.props.active).toEqual(true)
    wrapper.unmount()
  })
})
