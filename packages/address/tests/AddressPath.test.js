import React from 'react'
import { shallow } from 'enzyme'

import AddressPath from '../src/AddressPath'
import Address from '../src/Address'
import { locations } from './fixtures/locations'

const locLength = locations.length

describe('<AddressPath />', () => {
  describe('rendering', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(
        <AddressPath>
          {
            locations.map(location => (
              <Address {...location} />
            ))
          }
        </AddressPath>
      )
    })

    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it(`should render ${locLength} element(s)`, () => {
      const pathElements = wrapper.find('Address')
      expect(pathElements).toHaveLength(locLength)
    })
  })
})
