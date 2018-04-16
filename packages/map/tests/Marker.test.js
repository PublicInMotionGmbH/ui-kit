import React from 'react'
import { shallow } from 'enzyme'

import GoogleMapsMock from './utils/GoogleMapsMock'

import Marker from '../src/Marker'

describe('<Marker />', () => {
  let mock

  beforeEach(() => (mock = GoogleMapsMock.create()))
  afterEach(() => mock.detach())

  it('renders children correctly', () => {
    const wrapper = shallow(
      <Marker position={{ lat: -27.5598, lng: 151.9507 }} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should open InfoWindow onClick', () => {
    const wrapper = shallow(
      <Marker
        position={{ lat: -27.5598, lng: 151.9507 }}
        info='InfoWindow is open'
      />
    )

    wrapper.find('Marker').prop('onClick')()
    wrapper.update()

    expect(wrapper.find('InfoWindow').length).toBeTruthy()
  })

  it('should close InfoWindow onCloseClick', () => {
    const wrapper = shallow(
      <Marker
        position={{ lat: -27.5598, lng: 151.9507 }}
        info='InfoWindow is open'
      />
    )

    wrapper.find('Marker').prop('onClick')()
    wrapper.update()

    expect(wrapper.find('InfoWindow').length).toBeTruthy()

    wrapper.find('InfoWindow').prop('onCloseClick')()
    wrapper.update()

    expect(wrapper.find('InfoWindow').length).not.toBeTruthy()
  })

  it('should allow to control InfoWindow from outside', () => {
    const wrapper = shallow(
      <Marker
        position={{ lat: -27.5598, lng: 151.9507 }}
        info='This is InfoWindow'
        open
      />
    )

    expect(wrapper.find('InfoWindow').length).toBe(1)

    wrapper.setProps({
      open: false
    })

    expect(wrapper.find('InfoWindow').length).toBe(0)
  })

  it('should pass info text to InfoWindow', () => {
    const wrapper = shallow(
      <Marker
        position={{ lat: -27.5598, lng: 151.9507 }}
        info='This is InfoWindow'
        open
      />
    )

    const infoText = wrapper.find('InfoWindow').props().children.props.children

    expect(infoText).toEqual('This is InfoWindow')
  })

  it('should open InfoWindow onClick when it is self-controlled', () => {
    const wrapper = shallow(
      <Marker
        position={{ lat: -27.5598, lng: 151.9507 }}
        info='This is InfoWindow'
      />
    )

    wrapper.find('Marker').prop('onClick')()
    wrapper.update()

    expect(wrapper.find('InfoWindow').length).toBe(1)
  })

  it('should close InfoWindow on second onClick when it is self-controlled', () => {
    const wrapper = shallow(
      <Marker
        position={{ lat: -27.5598, lng: 151.9507 }}
        info='This is InfoWindow'
      />
    )

    wrapper.find('Marker').prop('onClick')()
    wrapper.find('Marker').prop('onClick')()
    wrapper.update()

    expect(wrapper.find('InfoWindow').length).toBe(0)
  })

  it('should fire external onClick handler', () => {
    const spy = jest.fn()

    const wrapper = shallow(
      <Marker
        position={{ lat: -27.5598, lng: 151.9507 }}
        info='This is InfoWindow'
        onClick={spy}
      />
    )

    wrapper.find('Marker').prop('onClick')()
    expect(spy.mock.calls.length).toBe(1)
  })

  it('should fire external onClose handler', () => {
    const spy = jest.fn()

    const wrapper = shallow(
      <Marker
        position={{ lat: -27.5598, lng: 151.9507 }}
        info='This is InfoWindow'
        onClose={spy}
      />
    )

    // Open InfoWindow
    wrapper.find('Marker').prop('onClick')()
    wrapper.update()

    // Fire on close click
    wrapper.find('InfoWindow').prop('onCloseClick')()
    expect(spy.mock.calls.length).toBe(1)
  })

  it('should not open InfoWindow on click when it is externally controlled', () => {
    const wrapper = shallow(
      <Marker
        position={{ lat: -27.5598, lng: 151.9507 }}
        info='This is InfoWindow'
        open={false}
      />
    )

    expect(wrapper.find('InfoWindow').length).toBe(0)
  })

  it('should switch from self-controlled to externally controlled', () => {
    const wrapper = shallow(
      <Marker
        position={{ lat: -27.5598, lng: 151.9507 }}
        info='This is InfoWindow'
      />
    )

    // Open InfoWindow
    wrapper.find('Marker').prop('onClick')()
    wrapper.update()

    wrapper.setProps({ open: false })
    expect(wrapper.find('InfoWindow').length).toBe(0)

    wrapper.setProps({ open: true })
    expect(wrapper.find('InfoWindow').length).toBe(1)
  })

  it('should switch from externally controlled to self-controlled', () => {
    const wrapper = shallow(
      <Marker
        position={{ lat: -27.5598, lng: 151.9507 }}
        info='This is InfoWindow'
        open
      />
    )

    wrapper.setProps({ open: undefined })
    wrapper.update()

    wrapper.find('Marker').prop('onClick')()
    wrapper.update()

    expect(wrapper.find('InfoWindow').length).toBe(0)

    wrapper.find('Marker').prop('onClick')()
    wrapper.update()

    expect(wrapper.find('InfoWindow').length).toBe(1)
  })

  it('should change status to closed when info is removed', () => {
    const wrapper = shallow(
      <Marker
        position={{ lat: -27.5598, lng: 151.9507 }}
        info='This is InfoWindow'
      />
    )

    wrapper.find('Marker').prop('onClick')()
    wrapper.update()

    wrapper.setProps({ info: undefined })
    expect(wrapper.find('InfoWindow').length).toBe(0)

    wrapper.setProps({ info: 'Another info' })
    expect(wrapper.find('InfoWindow').length).toBe(0)

    wrapper.find('Marker').prop('onClick')()
    wrapper.update()

    expect(wrapper.find('InfoWindow').length).toBe(1)
  })
})
