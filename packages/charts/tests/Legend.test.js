import React from 'react'
import Legend from '../src/Legend'
import { shallow } from 'enzyme'

const pieTestData = [
  { label: 'Cats', value: 35, color: ' ', className: '', id: 0, disabled: false },
  { label: 'Dogs', value: 40, color: ' ', className: '', id: 1, disabled: false },
  { label: 'Birds', value: 55, color: ' ', className: '', id: 2, disabled: false },
  { label: 'Cats1', value: 35, color: ' ', className: '', id: 3, disabled: false },
  { label: 'Dogs1', value: 40, color: ' ', className: '', id: 4, disabled: false },
  { label: 'Birds1', value: 55, color: ' ', className: '', id: 5, disabled: false },
  { label: 'Cats2', value: 35, color: ' ', className: '', id: 6, disabled: false },
  { label: 'Dogs2', value: 40, color: ' ', className: '', id: 7, disabled: false },
  { label: 'Birds2', value: 55, color: ' ', className: '', id: 8, disabled: false },
  { label: 'Lions2', value: 35, color: ' ', className: '', id: 9, disabled: false }
]

const lineTestData = [{
  className: 'className',
  color: null,
  title: 'Line 1',
  id: 0,
  disabled: false,
  dataItems: [{ x: new Date('May 23 2017').getTime(), y: 5 }, { x: new Date('May 29 2017').getTime(), y: 2 }, { x: new Date('May 31 2017').getTime(), y: 2 }, { x: new Date('June 13 2017').getTime(), y: 2 }]
}]

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
