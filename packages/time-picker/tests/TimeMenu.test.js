import React from 'react'
import { shallow } from 'enzyme'

import TimeMenu from '../src/TimeMenu'

const createWrapper = (props) => shallow(<TimeMenu {...props} />)

const data = [1, 2, 3, 4]

describe('<TimeMenu />', () => {
  it('renders correctly', () => {
    const wrapper = createWrapper({ data })

    expect(wrapper).toMatchSnapshot()
  })

  it('renders columns correctly', () => {
    const wrapper = createWrapper({ columns: 4, data })

    expect(wrapper.props().style.columnCount).toEqual(4)
  })
})

describe('onValueSelect', () => {
  it('is called when button is clicked', () => {
    const onValueSelect = jest.fn()
    const wrapper = createWrapper({ data, onValueSelect })

    const button = wrapper.find('Button').at(0)
    button.simulate('click')
    expect(onValueSelect).toHaveBeenCalledTimes(1)
  })

  it('passes value correctly', () => {
    let selectedValue
    const onValueSelect = jest.fn().mockImplementation(n => { selectedValue = n })
    const value = data[0]
    const wrapper = createWrapper({ data, onValueSelect })

    const button = wrapper.find('Button').at(0)
    button.simulate('click')
    expect(selectedValue).toEqual(value)
  })
})
