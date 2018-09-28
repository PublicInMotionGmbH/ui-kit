import React from 'react'
import { shallow } from 'enzyme'

import Address from '../src/Address'

describe('<Address />', () => {
  describe('rendering', () => {
    let wrapper
    const props = {
      address: 'Test address',
      details: 'Test details'
    }

    beforeEach(() => {
      wrapper = shallow(<Address {...props} />)
    })

    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render properly with short element', () => {
      wrapper.setProps({ short: 'HGW' })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
