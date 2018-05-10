import React from 'react'
import { mount, shallow } from 'enzyme'

import TimePicker from '../src/TimePicker'

const createWrapper = (props) => mount(<TimePicker {...props} />)

jest.mock('moment', () => () => ({format: () => '2018–05–10T17:26:56+00:00'}))

describe('<TimePicker />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TimePicker />)

    expect(wrapper).toMatchSnapshot()
  })
})

describe('onChange', () => {
  let onChange, wrapper

  beforeEach(() => {
    onChange = jest.fn()
    wrapper = createWrapper({ onChange })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('is called when state.value changes', () => {
    const value = new Date()
    wrapper.setState({ value })
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
