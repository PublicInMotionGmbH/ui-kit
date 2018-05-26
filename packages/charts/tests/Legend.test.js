import React from 'react'
import Legend from '../src/Legend'
import { shallow } from 'enzyme'

// import { lineTestData, pieTestData } from './testData.test'
const lineTestData = [{
  className: 'className',
  color: null,
  title: 'Line 1',
  id: 0,
  disabled: false,
  dataItems: [
    { x: new Date('May 23 2017').getTime(), y: 5 },
    { x: new Date('May 29 2017').getTime(), y: 2 },
    { x: new Date('May 31 2017').getTime(), y: 2 },
    { x: new Date('June 13 2017').getTime(), y: 2 }
  ]
}]

const pieTestData = {
  className: 'className',
  title: 'Pie Data',
  dataItems: [
    { label: 'Cats', value: 35, color: ' ', className: '', disabled: true },
    { label: 'Dogs', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds', value: 55, color: ' ', className: '', disabled: true },
    { label: 'Cats1', value: 35, color: ' ', className: '', disabled: true },
    { label: 'Dogs1', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds1', value: 55, color: ' ', className: '', disabled: false },
    { label: 'Cats2', value: 35, color: ' ', className: '', disabled: false },
    { label: 'Dogs2', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds2', value: 55, color: ' ', className: '', disabled: false },
    { label: 'Lions2', value: 35, color: ' ', className: '', disabled: true }
  ]
}

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
      props = createProps({ dataItems: pieTestData.dataItems })
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
