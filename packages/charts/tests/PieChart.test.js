import React from 'react'
import PieChart from '../src/PieChart'
import { shallow } from 'enzyme'

const ARC_SERIES = 'ArcSeries'

export const testData = {
  className: 'className',
  title: 'Pie Data',
  dataItems: [
    { label: 'Cats', value: 35, color: ' ', className: '', disabled: false },
    { label: 'Dogs', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds', value: 55, color: ' ', className: '', disabled: false }
  ]
}
export const testDataDisabled = {
  className: 'className',
  title: 'Pie Data',
  dataItems: [
    { label: 'Cats', value: 35, color: ' ', className: '', disabled: true },
    { label: 'Dogs', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds', value: 55, color: ' ', className: '', disabled: true }
  ]
}

const createProps = (props = {}) => ({
  data: testData,
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<PieChart {...props} />)

describe('<PieChart>', () => {
  let wrapper, props
  describe('when rendered without disabled items', () => {
    beforeEach(() => {
      wrapper = createWrapper()
    })
    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when rendered with disabled items', () => {
    beforeEach(() => {
      props = createProps({ data: testDataDisabled })
      wrapper = createWrapper(props)
    })
    it('should render only one arc', () => {
      expect(wrapper.find(ARC_SERIES)).toHaveLength(1)
    })
  })
})
