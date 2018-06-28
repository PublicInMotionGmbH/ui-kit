import React from 'react'
import { shallow } from 'enzyme'

import OptionsInputValue from '../src/OptionsInputValue'

// Options array for testing
const options = [
  { id: 'person', icon: 'person', label: 'Adults', description: 'Older than 15', default: 1 },
  { id: 'rocket', icon: 'rocket', label: 'Rockets' }
]

const persistentOptions = ['person']

const value = { person: 1, rocket: 1 }
const valueWithZero = { person: 0, rocket: 0 }

describe('<OptionTooltipValue />', () => {
  it('should render properly', () => {
    const wrapper = shallow(<OptionsInputValue value={value} options={options} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render properly with zero value', () => {
    const wrapper = shallow(<OptionsInputValue value={valueWithZero} options={options} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render properly with persistent option', () => {
    const wrapper = shallow(<OptionsInputValue value={valueWithZero} options={options} persistentOptions={persistentOptions} />)
    expect(wrapper).toMatchSnapshot()
  })
})
