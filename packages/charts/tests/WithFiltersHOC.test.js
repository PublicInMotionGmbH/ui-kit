import React from 'react'
import { shallow } from 'enzyme'

import WithFiltersHOC from '../src/WithFiltersHOC'

const testArray = [
  {
    className: 'className',
    color: null,
    title: 'Line 1',
    id: 0,
    disabled: false,
    dataItems: [{ x: new Date('May 23 2017').getTime(), y: 5 }, { x: new Date('May 29 2017').getTime(), y: 2 }, { x: new Date('May 31 2017').getTime(), y: 2 }, { x: new Date('June 13 2017').getTime(), y: 2 }]
  },
  {
    className: 'className',
    color: null,
    id: 1,
    title: 'Line 2',
    disabled: false,
    dataItems: [{ x: new Date('May 23 2017').getTime(), y: 3 }, { x: new Date('May 29 2017').getTime(), y: 8 }, { x: new Date('May 31 2017').getTime(), y: 1 }, { x: new Date('June 13 2017').getTime(), y: 2 }]
  }
]
export const testPie = {
  className: 'className',
  title: 'Pie Data',
  dataItems: [
    { label: 'Cats', value: 35, color: ' ', className: '', disabled: false },
    { label: 'Dogs', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds', value: 55, color: ' ', className: '', disabled: false }
  ]
}

const createProps = (props = {}) => ({
  data: testArray,
  ...props
})
const defaultProps = createProps()
const TestComponent = function (props) { return <div {...props}>TEST HOC</div> }
const HocArrayData = WithFiltersHOC(TestComponent)
const HocObjectData = WithFiltersHOC(TestComponent, ['dataItems'])

const createWrapper = (props = defaultProps) => shallow(<HocArrayData {...props} />)
const createWrapperObj = (props = {...defaultProps, data: testPie}) => shallow(<HocObjectData {...props} />)

describe('<WithFiltersHOC>', () => {
  let wrapper, props
  describe('when rendered', () => {
    it('should render properly', () => {
      wrapper = createWrapper()
      expect(wrapper).toMatchSnapshot()
    })
    it('should render properly with legend at the bottom', () => {
      props = createProps({ legendPosition: 'bottom' })
      wrapper = createWrapper(props)
      expect(wrapper).toMatchSnapshot()
    })
    it('should render properly with legend at the left side', () => {
      props = createProps({ legendPosition: 'left' })
      wrapper = createWrapper(props)
      expect(wrapper).toMatchSnapshot()
    })
    it('should render properly with legend at the right side', () => {
      props = createProps({ legendPosition: 'right' })
      wrapper = createWrapper(props)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('when line/bar data (array) is passed', () => {
    describe('when legend element is clicked', () => {
      let item1, item2
      beforeEach(() => {
        props = createProps({ legendProps: { onClick: jest.fn() } })
        wrapper = createWrapper(props)
        item1 = wrapper.find('Legend').dive().find('LegendItem').first()
        item2 = wrapper.find('Legend').dive().find('LegendItem').last()
      })

      it('should change disabled state of the first item', () => {
        item1.simulate('click')
        expect(wrapper.state().modifiedData[0].disabled).toBe(true)
      })
      it('should invoke onClick function from props', () => {
        item1.simulate('click')
        expect(props.legendProps.onClick).toHaveBeenCalledTimes(1)
      })
      it('should not allow to deselect all items', () => {
        item1.simulate('click')
        item2.simulate('click')
        expect(props.legendProps.onClick).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('when pie data(object) is passed', () => {
    let item1
    beforeEach(() => {
      props = createProps({ data: testPie, legendProps: { onClick: jest.fn() } })
      wrapper = createWrapperObj(props)
      item1 = wrapper.find('Legend').dive().find('LegendItem').first()
    })
    it('should change disabled state of the first item', () => {
      item1.simulate('click')
      expect(wrapper.state().modifiedData.dataItems[0].disabled).toBe(true)
    })
  })
})
