import React from 'react'
import PropTypes from 'prop-types'
import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  LineSeries,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalGridLines
} from 'react-vis'

import { buildClassName } from '@talixo/shared'

import Highligth from './Highlight'
import { dataItemPropTypes, generateSeriesClassName } from './common'

const moduleName = 'chart'

const Components = {
  bar: VerticalBarSeries.displayName = 'BarChart' && VerticalBarSeries,
  line: LineSeries
}

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Line chart data  */
  data: dataItemPropTypes,

  /** Line chart data  */
  xAxisTitle: PropTypes.string,

  /** Line chart data  */
  yAxisTitle: PropTypes.string,

  /** Additional wrapper styles */
  style: PropTypes.object,

  /** Idicates if x axis should be displayed as date */
  timeSeries: PropTypes.bool,

  /** Type of chart (line or bar) */
  type: PropTypes.oneOf(['line', 'bar']),

  /** indicates if chart is zoomable, can be applied to chart  */
  zoomable: PropTypes.bool
}

const defaultProps = {
  data: [[{}]],
  lineColors: [],
  xAxisTitle: '',
  yAxisTitle: '',
  timeSeries: false,
  type: 'line',
  zoomable: false
}

/**
 * Component which represents Chart.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class Chart extends React.Component {
  state = {
    lastDrawLocation: null
  }

  getChartType = () => {
    const { timeSeries, type } = this.props
    return timeSeries
      ? 'time'
      : type === 'bar'
        ? 'ordinal'
        : 'linear'
  }

  getSeriesProps = (item, index) => ({
    data: item.dataItems,
    color: item.color,
    className: generateSeriesClassName(item.id || index),
    key: generateSeriesClassName(item.id || index, item.className),
    ...this.props.dataSeriesProps
  })

  onBrushEnd = (area) => {
    const { onHightlightBrushEnd } = this.props
    this.setState({ lastDrawLocation: area })
    if (onHightlightBrushEnd) onHightlightBrushEnd(area)
  }

  render () {
    const { lastDrawLocation } = this.state
    const { onBrushEnd, getChartType, getSeriesProps } = this
    const {
      className,
      data,
      dataSeriesProps,
      lineProps,
      xAxisTitle,
      yAxisTitle,
      style,
      type,
      zoomable,
      ...passedProps
    } = this.props

    const wrapperCls = buildClassName(moduleName, className)
    const RenderComponet = Components[type]
    const isLineChart = type === 'line'
    const xType = !passedProps.xType && getChartType()

    // TODO: filter disabled
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
        <YAxis title={yAxisTitle} />
        {
          data
            .map((item, index) => (
              <RenderComponet
                style={isLineChart ? { fill: 'none' } : {}}
                {...getSeriesProps(item, index)}
              />
            ))
        }
        {
          zoomable && type === 'line' &&
          <Highligth
            color={null}
            onBrushEnd={onBrushEnd}
          />
        }
        <XAxis title={xAxisTitle} />
        <YAxis title={yAxisTitle} />
      </FlexibleXYPlot>
    )
  }
}

Chart.propTypes = propTypes

Chart.defaultProps = defaultProps

export default Chart
