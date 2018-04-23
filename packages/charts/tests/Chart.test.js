import React from 'react'
import Chart from '../src/Chart'
import { shallow } from 'enzyme'

const HIGHLIGHT = 'Highlight'
const PLOT = 'FlexibleXYPlot'
const BAR_SERIES = 'VerticalBarSeries'
const LINE_SERIES = 'LineSeries'

const testData = [
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
const testDataDisabled = [
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
    disabled: true,
    dataItems: [{ x: new Date('May 23 2017').getTime(), y: 3 }, { x: new Date('May 29 2017').getTime(), y: 8 }, { x: new Date('May 31 2017').getTime(), y: 1 }, { x: new Date('June 13 2017').getTime(), y: 2 }]
  }
]

const createProps = (props = {}) => ({
  data: testData,
  type: 'line',
  zoomable: false,
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<Chart {...props} />)

describe('<Chart>', () => {
  let wrapper, props
  describe('when rendered', () => {
    beforeEach(() => {
      wrapper = createWrapper()
    })
    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when disabled data is passed', () => {
    beforeEach(() => {
      props = createProps({ data: testDataDisabled, type: 'line' })
      wrapper = createWrapper(props)
    })
    it('should render only one line', () => {
      expect(wrapper.find(LINE_SERIES)).toHaveLength(1)
    })
  })

  describe('when zoomable line chart is rendered', () => {
    beforeEach(() => {
      props = createProps({ type: 'line', zoomable: true })
      wrapper = createWrapper(props)
    })

    it('should pass style.fill=none to rendered component', () => {
      expect(wrapper.find(LINE_SERIES).forEach(node => {
        expect(node.props().style.fill).toEqual('none')
      }))
    })

    it('should render highlight component', () => {
      expect(wrapper.find(HIGHLIGHT).exists()).toBe(true)
    })

    it('should set xType prop of FLexibleXYPlot to `linear`', () => {
      expect(wrapper.find(PLOT).props().xType).toBe('linear')
    })

    describe('when xAxis is of type `time`', () => {
      beforeEach(() => {
        wrapper.setProps({ timeSeries: true })
      })
      it('should set xType prop of FLexibleXYPlot to `time`', () => {
        expect(wrapper.find(PLOT).props().xType).toBe('time')
      })
    })

    describe('when zomm area is selected', () => {
      const area = { top: 0, bottom: 0, left: new Date('May 23 2017').getTime(), right: new Date('May 29 2017').getTime() }

      beforeEach(() => {
        wrapper.find(HIGHLIGHT).props().onBrushEnd(area)
        wrapper.update()
      })

      it('should set state.lastDrawLocation to equal area', () => {
        expect(wrapper.state().lastDrawLocation).toEqual(area)
      })

      it('should set lastDrawLocation to given area', () => {
        expect(wrapper.find(PLOT).props().xDomain).toEqual([area.left, area.right])
      })
    })
  })

  describe('when bar chart is rendered', () => {
    beforeEach(() => {
      props = createProps({ type: 'bar', zoomable: true })
      wrapper = createWrapper(props)
    })

    it('should pass style.fill=none to rendered component', () => {
      expect(wrapper.find(BAR_SERIES).forEach(node => {
        expect(node.props().style.fill).not.toEqual('null')
      }))
    })
    it('should set xType prop of FLexibleXYPlot to `ordinal`', () => {
      expect(wrapper.find(PLOT).props().xType).toBe('ordinal')
    })
    it('should not render Hightlight component', () => {
      expect(wrapper.find(HIGHLIGHT).exists()).toBe(false)
    })
  })
})
