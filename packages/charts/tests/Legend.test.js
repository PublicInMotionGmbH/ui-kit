import React from 'react'
import Legend from '../src/Legend'
import { shallow } from 'enzyme'

import { lineTestData, pieTestData } from './testData'

const createProps = (props = {}) => ({
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<Legend {...props} />)

describe('<Legend> component ', () => {
  let wrapper, props

  describe('when rendered', () => {
    it('should renders chart data properly', () => {
      props = createProps({ dataItems: lineTestData })
      wrapper = createWrapper(props)
      expect(wrapper).toMatchSnapshot()
    })
    it('should renders piechart data properly', () => {
      props = createProps({ dataItems: pieTestData })
      wrapper = createWrapper(props)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('passes props to children', () => {
    let element
    beforeEach(() => {
      props = createProps({ onClick: jest.fn(), dataItems: lineTestData })
      wrapper = createWrapper(props)
      element = wrapper.find('LegendItem')
    })
    it('should invoke onClick function', () => {
      element.simulate('click')
      expect(props.onClick).toHaveBeenCalledTimes(1)
    })
  })
})
