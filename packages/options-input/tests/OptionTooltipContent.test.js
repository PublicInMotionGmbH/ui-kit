import React from 'react'
import { shallow } from 'enzyme'

import OptionTooltipContent from '../src/OptionTooltipContent'

// Option for testing
const option = {
  id: 'person',
  icon: 'person',
  label: 'Adults',
  default: 1
}

const advancedOption = {
  id: 'person',
  icon: 'person',
  label: 'Adults',
  description: 'Older than 15',
  default: 1
}

describe('<OptionTooltipContent />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<OptionTooltipContent option={option} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders advanced children correctly', () => {
    const wrapper = shallow(<OptionTooltipContent option={advancedOption} />)

    expect(wrapper).toMatchSnapshot()
  })
})