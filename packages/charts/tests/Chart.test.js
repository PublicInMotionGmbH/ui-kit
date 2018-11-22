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
    disabled: false,
    dataItems: [{ x: 1495490400000, y: 5 }, { x: 1496008800000, y: 2 }, { x: 1496181600000, y: 2 }, { x: 1497304800000, y: 2 }]
  },
  {
    className: 'className',
    color: null,
    title: 'Line 2',
    disabled: false,
    dataItems: [{ x: 1495490400000, y: 5 }, { x: 1496008800000, y: 2 }, { x: 1496181600000, y: 2 }, { x: 1497304800000, y: 2 }]
  }
]
const testDataDisabled = [
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
    disabled: true,
    dataItems: [{ x: 1495490400000, y: 5 }, { x: 1496008800000, y: 2 }, { x: 1496181600000, y: 2 }, { x: 1497304800000, y: 2 }]
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
  describe('when rendered', () => {
    it('should render properly', () => {
      const wrapper = createWrapper()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when disabled data is passed', () => {
    it('should render only one line', () => {
      const props = createProps({ data: testDataDisabled, type: 'line' })
      const wrapper = createWrapper(props)
      expect(wrapper.find(LINE_SERIES)).toHaveLength(1)
    })
  })

  describe('when zoomable line chart is rendered', () => {
    it('should pass style.fill=none to rendered component', () => {
      const props = createProps({ type: 'line', zoomable: true })
      const wrapper = createWrapper(props)
      expect(wrapper.find(LINE_SERIES).forEach(node => {
        expect(node.props().style.fill).toEqual('none')
      }))
    })

    it('should render highlight component', () => {
      const props = createProps({ type: 'line', zoomable: true })
      const wrapper = createWrapper(props)
      expect(wrapper.find(HIGHLIGHT).exists()).toBe(true)
    })

    it('should set xType prop of FLexibleXYPlot to `linear`', () => {
      const props = createProps({ type: 'line', zoomable: true })
      const wrapper = createWrapper(props)
      expect(wrapper.find(PLOT).props().xType).toBe('linear')
    })

    describe('when xAxis is of type `time`', () => {
      it('should set xType prop of FLexibleXYPlot to `time`', () => {
        const props = createProps({ type: 'line', zoomable: true, timeSeries: true })
        const wrapper = createWrapper(props)
        expect(wrapper.find(PLOT).props().xType).toBe('time')
      })
    })

    describe('when zomm area is selected', () => {
      const area = { top: 0, bottom: 0, left: 1495490400000, right: 1496008800000 }
      const brushArea = { bottom: 2, left: 1495490400000, right: 1496008800000, top: 4 }
      const dragArea = { bottom: 3, left: 1496008800000, right: 1496181600000, top: 4 }

      it('should set state.lastDrawLocation to equal area', () => {
        const props = createProps({ type: 'line', zoomable: true, timeSeries: true })
        const wrapper = createWrapper(props)
        wrapper.find(HIGHLIGHT).props().onBrushEnd(area)
        wrapper.update()
        expect(wrapper.state().lastDrawLocation).toEqual(area)
      })

      it('should set lastDrawLocation to given area', () => {
        const props = createProps({ type: 'line', zoomable: true, timeSeries: true })
        const wrapper = createWrapper(props)
        wrapper.find(HIGHLIGHT).props().onBrushEnd(area)
        wrapper.update()
        expect(wrapper.find(PLOT).props().xDomain).toEqual([area.left, area.right])
      })

      it('should set lastDrawLocation to given area after onDrag event', () => {
        const props = createProps({ type: 'line', zoomable: true, timeSeries: true })
        const wrapper = createWrapper(props)
        wrapper.find(HIGHLIGHT).props().onDrag(dragArea)
        expect(wrapper.state().lastDrawLocation).toEqual(dragArea)
      })

      it('should set lastDrawLocation to given area after onBrushEnd event', () => {
        const props = createProps({ type: 'line', zoomable: true, timeSeries: true })
        const wrapper = createWrapper(props)
        wrapper.find(HIGHLIGHT).props().onBrushEnd(brushArea)
        wrapper.update()
        expect(wrapper.find(PLOT).props().xDomain).toEqual([brushArea.left, brushArea.right])
        expect(wrapper.find(PLOT).props().yDomain).toEqual([brushArea.bottom, brushArea.top])
      })
    })
  })

  describe('when bar chart is rendered', () => {
    it('should pass style.fill=none to rendered component', () => {
      const props = createProps({ type: 'bar', zoomable: true })
      const wrapper = createWrapper(props)
      expect(wrapper.find(BAR_SERIES).forEach(node => {
        expect(node.props().style.fill).not.toEqual('null')
      }))
    })

    it('should set xType prop of FLexibleXYPlot to `ordinal`', () => {
      const props = createProps({ type: 'bar', zoomable: true })
      const wrapper = createWrapper(props)
      expect(wrapper.find(PLOT).props().xType).toBe('ordinal')
    })

    it('should not render Hightlight component', () => {
      const props = createProps({ type: 'bar', zoomable: true })
      const wrapper = createWrapper(props)
      expect(wrapper.find(HIGHLIGHT).exists()).toBe(false)
    })
  })
})
