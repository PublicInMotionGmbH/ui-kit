import React from 'react'
import { mount, shallow } from 'enzyme'
import moment from 'moment'
import TimePicker from '../src/TimePicker'

jest.mock('moment', () => {
  const moment = require.requireActual('moment')
  return moment.utc
})

let D = global.Date.now

function mock (date) {
  global.Date.now = jest.fn(() => date)
}

function unmock () {
  global.Date.now = D
}

const createWrapper = (props) => mount(<TimePicker {...props} />)

describe('<TimePicker />', () => {
  afterEach(unmock)

  it('renders correctly', () => {
    mock('2017')
    const wrapper = shallow(<TimePicker />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders passed value correctly', () => {
    mock('2017')
    const wrapper = shallow(<TimePicker value='13:00' />)
    const inputHours = wrapper.find('TimeInput').at(0)
    const inputMinutes = wrapper.find('TimeInput').at(1)

    const hours = moment(inputHours.props().value).hours()
    const minutes = moment(inputMinutes.props().value).minutes()

    expect(hours).toEqual(13)
    expect(minutes).toEqual(0)
  })

  it('passes format `12` correctly', () => {
    mock('2017')
    const wrapper = shallow(<TimePicker hourFormat='12' />)
    const inputHours = wrapper.find('TimeInput').at(0)
    const inputMinutes = wrapper.find('TimeInput').at(1)
    const timeMenu = wrapper.find('TimeMenuHour12')

    const hoursFormat = inputHours.props().format
    const minutesFormat = inputMinutes.props().format
    const menuFormat = timeMenu.props().format

    expect(hoursFormat).toEqual('hh A')
    expect(minutesFormat).toEqual('mm')
    expect(menuFormat).toEqual('hh A')
  })

  it('passes format `24` correctly', () => {
    mock('2017')
    const wrapper = shallow(<TimePicker hourFormat='24' />)
    const inputHours = wrapper.find('TimeInput').at(0)
    const inputMinutes = wrapper.find('TimeInput').at(1)
    const timeMenu = wrapper.find('TimeMenuHour24')

    const hoursFormat = inputHours.props().format
    const minutesFormat = inputMinutes.props().format
    const menuFormat = timeMenu.props().format

    expect(hoursFormat).toEqual('HH')
    expect(minutesFormat).toEqual('mm')
    expect(menuFormat).toEqual('HH')
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

describe('handleHoursBlur', () => {
  let wrapper, timeInput
  beforeEach(() => {
    wrapper = createWrapper({ value: '00:00' })
    timeInput = wrapper.find('input').at(0)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('formats value correctly', () => {
    timeInput.simulate('change', { target: { value: '3' } })
    timeInput.simulate('blur')

    const outputFormat = wrapper.state().value.format()
    const outputTime = moment(outputFormat).format('HH:mm')
    expect(outputTime).toEqual('03:00')
  })

  it('formats value correctly when format is `12` and suffix `PM`', () => {
    wrapper.setProps({ hourFormat: '12' })
    timeInput.simulate('change', { target: { value: '3' } })
    timeInput.simulate('keyDown', {
      which: 80,
      stopPropagation: () => {}
    })
    timeInput.simulate('blur')

    const outputFormat = wrapper.state().value.format()
    const outputTime = moment(outputFormat).format('HH:mm')
    expect(outputTime).toEqual('15:00')
  })

  it('formats value correctly when format is `12` and input value is an empty string', () => {
    wrapper.setProps({ hourFormat: '12' })
    timeInput.simulate('change', { target: { value: '' } })
    timeInput.simulate('blur')

    const outputFormat = wrapper.state().value.format()
    const outputTime = moment(outputFormat).format('HH:mm')
    expect(outputTime).toEqual('00:00')
  })
})

describe('handleMinutesBlur', () => {
  let wrapper, timeInput
  beforeEach(() => {
    wrapper = createWrapper({ value: '00:00' })
    timeInput = wrapper.find('input').at(1)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('formats value correctly', () => {
    timeInput.simulate('change', { target: { value: '3' } })
    timeInput.simulate('blur')

    const outputFormat = wrapper.state().value.format()
    const outputTime = moment(outputFormat).format('HH:mm')
    expect(outputTime).toEqual('00:03')
  })
})

describe('TimeMenu', () => {
  afterEach(unmock)

  it('TimeMenuHour12 passes data correctly', () => {
    mock('2017')
    const wrapper = shallow(<TimePicker hourFormat='12' />)
    const timeMenu = wrapper.find('TimeMenuHour12')

    const dataAM = timeMenu.props().dataAM
    const dataPM = timeMenu.props().dataPM

    expect(dataAM).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    expect(dataPM).toEqual([12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23])
  })

  it('TimeMenuHour24 passes data correctly', () => {
    mock('2017')
    const wrapper = shallow(<TimePicker hourFormat='24' />)
    const timeMenu = wrapper.find('TimeMenuHour24')

    const data = timeMenu.props().data

    expect(data).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23])
  })

  it('TimeMenu passes data correctly', () => {
    mock('2017')
    const wrapper = shallow(<TimePicker hourFormat='24' />)
    const timeMenu = wrapper.find('TimeMenu')

    const data = timeMenu.props().data

    expect(data).toEqual([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55])
  })
})
