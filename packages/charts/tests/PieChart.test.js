import React from 'react'
import PieChart from '../src/PieChart'
import { shallow } from 'enzyme'

import { pieTestData } from './testData'

const createProps = (props = {}) => ({
  data: pieTestData,
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<PieChart {...props} />)

describe('<PieChart>', () => {
  let wrapper
  //, props
  describe('when rendered', () => {
    beforeEach(() => {
      wrapper = createWrapper()
    })
    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
