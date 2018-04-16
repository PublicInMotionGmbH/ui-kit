import React from 'react'
import { shallow } from 'enzyme'

import Marker from '../src/Marker'

describe('<Marker />', () => {
  let previousGoogle
  let routeFn

  beforeEach(() => {
    routeFn = jest.fn()
    previousGoogle = global.google || window.google
    global.google = window.google = {
      maps: {
        Map: function () {
          this.setCenter = jest.fn()
          this.setOptions = jest.fn()
          this.setZoom = jest.fn()
        },
        DirectionsService: function () {
          this.route = routeFn
        },
        DirectionsRenderer: function () {
          this.setDirections = jest.fn()
          this.setMap = jest.fn()
        },
        LatLng: function (lat, lng) {
          this.lat = lat
          this.lng = lng
        },
        Marker: function () {
          this.setPosition = jest.fn()
          this.setMap = jest.fn()
        },
        TravelMode: {
          DRIVING: 'driving'
        },
        DirectionsStatus: {
          OK: 'ok',
          ERROR: null
        },
        event: {
          addListener: jest.fn()
        }
      }
    }
  })

  afterEach(() => {
    global.google = window.google = previousGoogle
  })

  it('renders children correctly', () => {
    const wrapper = shallow(<Marker position={{lat: -27.5598, lng: 151.9507}} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('onClick open InfoWindow', () => {
    const wrapper = shallow(<Marker position={{lat: -27.5598, lng: 151.9507}} info='InfoWindow is open' />)

    wrapper.find('Marker').prop('onClick')()
    wrapper.update()

    expect(wrapper.find('InfoWindow').length).toBeTruthy()
  })

  it('onCloseClick close infoWindow', () => {
    const wrapper = shallow(<Marker position={{lat: -27.5598, lng: 151.9507}} info='InfoWindow is open' />)

    wrapper.find('Marker').prop('onClick')()
    wrapper.update()

    expect(wrapper.find('InfoWindow').length).toBeTruthy()

    wrapper.find('InfoWindow').prop('onCloseClick')()
    wrapper.update()

    expect(wrapper.find('InfoWindow').length).not.toBeTruthy()
  })

  it('info text is passed to infoWindow', () => {
    const wrapper = shallow(<Marker position={{lat: -27.5598, lng: 151.9507}} info='This is InfoWindow' />)

    wrapper.find('Marker').prop('onClick')()
    wrapper.update()
    expect(wrapper.find('InfoWindow').length).toBeTruthy()

    const infoText = wrapper.find('InfoWindow').props().children.props.children

    expect(infoText).toEqual('This is InfoWindow')
  })
})
