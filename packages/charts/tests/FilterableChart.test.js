import React from 'react'
import { shallow } from 'enzyme'

import FilterableChart from '../src/FilterableChart'
import Chart from '../src/Chart'
import PieChart from '../src/PieChart'

const testArray = [
  {
    className: 'className',
    color: null,
    title: 'Line 1',
    disabled: false,
    dataItems: [{ x: 1495490400000, y: 5 }, { x: 1496008800000, y: 2 }, { x: 1496181600000, y: 2 }, { x: 1497304800000, y: 2 }]
  },
  {
    className: 'className',
    color: null,
    title: 'Line 2',
    disabled: false,
    dataItems: [{ x: 1495490400000, y: 3 }, { x: 1496008800000, y: 8 }, { x: 1496181600000, y: 1 }, { x: 1497304800000, y: 2 }]
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
  ...props
})
const defaultProps = createProps()

const createWrapper = (props = defaultProps) => shallow(
  <FilterableChart {...props}>
    <Chart data={testArray} />
  </FilterableChart>
)
const createWrapperObj = (props = defaultProps) => shallow(
  <FilterableChart {...props} pathToDataItems={['dataItems']}>
    <PieChart data={testPie} />
  </FilterableChart>
)

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
      console.log(wrapper.find('Legend').dive())
      item1 = wrapper.find('Legend').dive().find('LegendItem').first()
    })
    it('should change disabled state of the first item', () => {
      item1.simulate('click')
      expect(wrapper.state().modifiedData.dataItems[0].disabled).toBe(true)
    })
  })
})
