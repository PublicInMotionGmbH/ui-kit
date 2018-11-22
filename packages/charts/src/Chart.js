import React from 'react'
import PropTypes from 'prop-types'
import {
  FlexibleXYPlot, XAxis, YAxis, LineSeries, HorizontalBarSeries, LabelSeries,
  HorizontalGridLines, VerticalBarSeries, VerticalGridLines, Highlight
} from 'react-vis'

import { buildClassName } from '@talixo/shared'

import { generateSeriesClassName } from './utils'

const moduleName = 'chart'

const Components = {
  'bar': VerticalBarSeries,
  'bar-horizontal': HorizontalBarSeries,
  'line': LineSeries
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

  /** Hide horizontal grid. */
  hideHorizontalGrid: PropTypes.bool,

  /** Hide vertical grid. */
  hideVerticalGrid: PropTypes.bool,

  /** Should series label be hidden? */
  hideSeriesLabels: PropTypes.bool,

  /** Props which will be applied to react-vis LabelSeries component. */
  seriesLabelProps: PropTypes.object,

  /** Idicates if x axis should be displayed as date */
  timeSeries: PropTypes.bool,

  /** Type of chart (line or bar). */
  type: PropTypes.oneOf(['bar', 'bar-horizontal', 'line']),

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
 * @property {boolean} [props.hideHorizontalGrid]
 * @property {boolean} [props.hideVerticalGrid]
 * @property {boolean} [props.hideSeriesLabels]
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
    if (timeSeries) {
      return 'time'
    }
    if (type === 'bar') {
      return 'ordinal'
    }
    return 'linear'
  }

  /**
   * Returns Data Series with its labels.
   *
   * @param item
   * @param index
   * @returns ReactElement[]
   */

  getSeries = (item, index) => {
    if (item.disabled) {
      return null
    }

    const { hideSeriesLabels, dataSeriesProps, seriesLabelProps, type } = this.props
    const RenderComponent = Components[type]
    const isLineChart = type === 'line'

    const itemProps = {
      data: item.dataItems,
      color: item.color,
      className: generateSeriesClassName(index, item.className),
      key: `${item.title || item.label || item.x}-${index}`,
      ...dataSeriesProps
    }

    const series = (
      <RenderComponent
        animate
        style={isLineChart ? {fill: 'none'} : {}}
        {...itemProps}
      />
    )

    const label = !hideSeriesLabels
      ? <LabelSeries data={item.dataItems} key={itemProps.key} {...seriesLabelProps} />
      : null

    return [series, label]
  }

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

  onDrag = (area) => {
    const defaultDrawLocation = { top: 0, bottom: 0, left: 0, right: 0 }
    const { lastDrawLocation } = this.state
    const location = lastDrawLocation || defaultDrawLocation
    this.setState({
      lastDrawLocation: {
        bottom: location.bottom + (area.top - area.bottom),
        left: location.left - (area.right - area.left),
        right: location.right - (area.right - area.left),
        top: location.top + (area.top - area.bottom)
      }
    })
  }

  render () {
    const { lastDrawLocation } = this.state
    const { onBrushEnd, getChartType, getSeries } = this
    const {
      className, data, dataSeriesProps, lineProps, xAxisTitle, yAxisTitle,
      hideHorizontalGrid, hideVerticalGrid, type, zoomable, ...passedProps
    } = this.props

    const wrapperCls = buildClassName(moduleName, className)
    const xType = !passedProps.xType && getChartType()

    return (
      <FlexibleXYPlot
        animation
        xType={xType}
        className={wrapperCls}
        xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
        yDomain={lastDrawLocation && [lastDrawLocation.bottom, lastDrawLocation.top]}
        {...passedProps}
      >
        { !hideHorizontalGrid && <HorizontalGridLines /> }
        { !hideVerticalGrid && <VerticalGridLines /> }
        { data.map((item, index) => getSeries(item, index))}
        {
          zoomable && type === 'line' &&
          <Highlight
            color={null}
            onBrushEnd={onBrushEnd}
            onDrag={this.onDrag}
          />
        }
        <YAxis title={yAxisTitle} />
        <XAxis title={xAxisTitle} />
      </FlexibleXYPlot>
    )
  }
}

Chart.propTypes = propTypes

Chart.defaultProps = defaultProps

Chart.displayName = 'Chart'

export default Chart
