import React from 'react'
import { shallow, mount } from 'enzyme'

import GoogleMapsMock from './utils/GoogleMapsMock'

import Map from '../src/Map'

describe('<Map />', () => {
  let mock

  beforeEach(() => (mock = GoogleMapsMock.create()))
  afterEach(() => mock.detach())

  it('renders children correctly', () => {
    const wrapper = shallow(<Map apiKey='this_is_api_key' />)

    expect(wrapper).toMatchSnapshot()
  })

  it('non-interactive block zoom control', () => {
    const wrapper = mount(<Map apiKey='this_is_api_key' interactive={false} />)

    // Simulate loading Google Maps API JS
    wrapper.children().instance().handleLoaded()
    wrapper.update()

    // Find google Map
    const map = wrapper.find('GoogleMap')

    expect(map.prop('defaultOptions').zoomControl).toBe(false)
  })

  it('render map element', () => {
    const wrapper = mount(<Map apiKey='this_is_api_key' />)

    // Simulate loading Google Maps API JS
    wrapper.children().instance().handleLoaded()
    wrapper.update()

    // Find google Map
    const map = wrapper.find('withScriptjs(withGoogleMap(Component))')

    expect(map.props().loadingElement.props.className).toMatch(`talixo-map`)
  })
})
