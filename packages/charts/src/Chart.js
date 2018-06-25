import React from 'react'
import PropTypes from 'prop-types'
import {
  FlexibleXYPlot, XAxis, YAxis, LineSeries,
  HorizontalGridLines, VerticalBarSeries, VerticalGridLines
} from 'react-vis'

import { buildClassName } from '@talixo/shared'

import Highlight from './Highlight'
import { generateSeriesClassName } from './utils'

const moduleName = 'chart'

const Components = {
  bar: VerticalBarSeries,
  line: LineSeries
}

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Line chart data.  */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      /** Additional data series className. */
      className: PropTypes.string,

      /** Color of the data series. */
      color: PropTypes.string,

      /** Data information to be displayed in chart. */
      dataItems: PropTypes.arrayOf(PropTypes.shape({
        /** X axis data. */
        x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

        /** Y axis data. */
        y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      })),

      /** Indicates if data will be shown in the chart. */
      disabled: PropTypes.bool,

      /** Label of data series. */
      label: PropTypes.string
    })
  ),

  /** Idicates if x axis should be displayed as date */
  timeSeries: PropTypes.bool,

  /** Type of chart (line or bar). */
  type: PropTypes.oneOf(['line', 'bar']),

  /** X axis title. */
  xAxisTitle: PropTypes.string,

  /** Y axis title. */
  yAxisTitle: PropTypes.string,

  /** Indicates if chart is zoomable, can be applied to chart. */
  zoomable: PropTypes.bool
}

const defaultProps = {
  data: [],
  lineColors: [],
  timeSeries: false,
  type: 'line',
  zoomable: false
}

/**
 * Component which represents Chart.
 *
 * @property {object} [props]
 * @property {string} [props.className]
 * @property {string} [props.xAxisTitle]
 * @property {string} [props.yAxisTitle]
 * @property {bool} [props.timeSeries]
 * @property {string} [props.type]
 * @property {bool} [props.zoomable]
 *
 * @property {object[]} [props.data]
 * @property {string} [props.data.className]
 * @property {string} [props.data.color]
 * @property {object} [props.data.dataItems]
 * @property {string|number} props.data.dataItems.x
 * @property {string|number} props.data.dataItems.y
 * @property {bool} [props.data.disabled]
 * @property {string} [props.data.label]
 *
 * @property {object} [state]
 * @property {number} [state.bottom]
 * @property {number} [state.left]
 * @property {number} [state.right]
 * @property {number} [state.top]
 *
 * @class
 */
class Chart extends React.Component {
  state = {
    lastDrawLocation: null
  }

  /**
   * Return a string for xType property of FlexibleXYPlot
   *
   * @returns {string}
   */
  getChartType = () => {
    const { timeSeries, type } = this.props
    return timeSeries
      ? 'time'
      : type === 'bar'
        ? 'ordinal'
        : 'linear'
  }

  /**
   * Returns props for data series
   *
   * @param item
   * @param index
   * @returns {{data: *, color: *, className: string, key: string}}
   */
  getSeriesProps = (item, index) => ({
    data: item.dataItems,
    color: item.color,
    className: generateSeriesClassName(index, item.className),
    key: `${item.title}-${index}`,
    ...this.props.dataSeriesProps
  })

  /**
   * Updates state when area is zoomed
   *
   * @param {object} area
   * @param {number} area.top
   * @param {number} area.right
   * @param {number} area.bottom
   * @param {number} area.left
   */
  onBrushEnd = (area) => {
    this.setState({ lastDrawLocation: area })
  }

  render () {
    const { lastDrawLocation } = this.state
    const { onBrushEnd, getChartType, getSeriesProps } = this
    const {
      className, data, dataSeriesProps, lineProps, xAxisTitle,
      yAxisTitle, type, zoomable, ...passedProps
    } = this.props

    const wrapperCls = buildClassName(moduleName, className)
    const RenderComponent = Components[type]
    const isLineChart = type === 'line'
    const xType = !passedProps.xType && getChartType()

    return (
      <FlexibleXYPlot
        animation
        xType={xType}
        className={wrapperCls}
        xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
        {...passedProps}
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title={xAxisTitle} />
        {
          data
            .map((item, index) => {
              return !item.disabled
                ? <RenderComponent
                  animate
                  style={isLineChart ? {fill: 'none'} : {}}
                  {...getSeriesProps(item, index)}
                />
                : null
            })
        }
        {
          zoomable && type === 'line' &&
          <Highlight
            color={null}
            onBrushEnd={onBrushEnd}
          />
        }
        <YAxis title={yAxisTitle} />
      </FlexibleXYPlot>
    )
  }
}

Chart.propTypes = propTypes

Chart.defaultProps = defaultProps

Chart.displayName = 'Chart'

export default Chart
