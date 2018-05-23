import React from 'react'
import LegendItem from '../src/LegendItem'
import { shallow } from 'enzyme'

const fakeProps = {
  className: 'test',
  color: 'white',
  id: '0',
  onClick: () => {},
  title: 'Title',
  value: 10
}

const createProps = (props = {}) => ({
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<LegendItem {...props} />)

describe('<LegendItem> component ', () => {
  let wrapper
  describe('rendering', () => {
    beforeEach(() => {
      wrapper = createWrapper(fakeProps)
    })
    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
