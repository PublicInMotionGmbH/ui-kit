import React from 'react'
import { shallow } from 'enzyme'

import TimeMenu from '../src/TimeMenu'

const createWrapper = (props) => shallow(<TimeMenu {...props} />)

let data = [1, 2, 3, 4]

describe('<TimeMenu />', () => {
  it('renders correctly', () => {
    const wrapper = createWrapper({ data })

    expect(wrapper).toMatchSnapshot()
  })

  it('renders columns correctly', () => {
    const wrapper = createWrapper({ columns: 4, data })

    expect(wrapper.props().style.columnCount).toEqual(4)
  })

  it('renders buttons correctly', () => {
    data = [0, 5, 10, 15, 20]
    const wrapper = createWrapper({ data })
    const buttons = wrapper.find('button')

    expect(buttons.length).toEqual(5)
  })

  it('renders button format correctly', () => {
    data = [0, 5, 10, 15, 20]
    const format = ':mm'
    const wrapper = createWrapper({ data, format })

    const button0 = wrapper.find('button').at(0)
    const button5 = wrapper.find('button').at(1)
    const button10 = wrapper.find('button').at(2)
    const button15 = wrapper.find('button').at(3)
    const button20 = wrapper.find('button').at(4)

    expect(button0.props().children).toEqual(':00')
    expect(button5.props().children).toEqual(':05')
    expect(button10.props().children).toEqual(':10')
    expect(button15.props().children).toEqual(':15')
    expect(button20.props().children).toEqual(':20')
  })

  it('renders selected button correctly', () => {
    data = [0, 5, 10, 15, 20]
    const format = ':mm'
    const value = new Date(2018, 5, 15, 0, 5, 0)
    const wrapper = createWrapper({ data, format, value })

    const button0 = wrapper.find('button').at(0)
    const button5 = wrapper.find('button').at(1)
    const button10 = wrapper.find('button').at(2)
    const button15 = wrapper.find('button').at(3)
    const button20 = wrapper.find('button').at(4)

    expect(button0.hasClass('talixo-time-menu__button--selected')).toEqual(false)
    expect(button5.hasClass('talixo-time-menu__button--selected')).toEqual(true)
    expect(button10.hasClass('talixo-time-menu__button--selected')).toEqual(false)
    expect(button15.hasClass('talixo-time-menu__button--selected')).toEqual(false)
    expect(button20.hasClass('talixo-time-menu__button--selected')).toEqual(false)
  })
})

describe('onValueSelect', () => {
  it('is called when button is clicked', () => {
    const onValueSelect = jest.fn()
    const wrapper = createWrapper({ data, onValueSelect })

    const button = wrapper.find('button').at(0)
    button.simulate('mousedown')
    expect(onValueSelect).toHaveBeenCalledTimes(1)
  })

  it('passes value correctly', () => {
    let selectedValue
    const onValueSelect = jest.fn().mockImplementation(n => { selectedValue = n })
    const value = data[0]
    const wrapper = createWrapper({ data, onValueSelect })

    const button = wrapper.find('button').at(0)
    button.simulate('mousedown')
    expect(selectedValue).toEqual(value)
  })
})
