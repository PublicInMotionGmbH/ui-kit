import React from 'react'
import LegendItem from '../src/LegendItem'
import { shallow } from 'enzyme'

const createProps = (props = {}) => ({
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<LegendItem {...props} />)

describe('<LegendItem> component ', () => {
  let wrapper
  describe('rendering', () => {
    beforeEach(() => {
      wrapper = createWrapper()
    })
    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
