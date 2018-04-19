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
import { generateSeriesClassName } from './config'

const moduleName = 'line-chart'

/**
 * Component which represents LineChart.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class LineChart extends React.Component {
  state = {
    lastDrawLocation: null
  }

  getSeriesProps = (item, index) => ({
    data: item.dataItems,
    color: item.color,
    className: generateSeriesClassName(item.id || index),
    key: generateSeriesClassName(item.id || index, item.className),
    ...this.props.dataSeriesProps
  })

  getComponentByType = (type) => {
    switch (type) {
      case 'bar':
        console.log(type)
        return VerticalBarSeries
      case 'line':
        return LineSeries
    }
  }

  render () {
    const { lastDrawLocation } = this.state
    const { getSeriesProps, getComponentByType } = this
    const {
      className,
      data,
      dataSeriesProps,
      lineProps,
      xAxisTitle,
      yAxisTitle,
      style,
      type,
      ...passedProps
    } = this.props
    const wrapperCls = buildClassName(moduleName, className)
    const RenderComponet = getComponentByType(type)
    const isLineChart = type === 'line'
    // TODO: Zoom while oridnal data
    return (
      <FlexibleXYPlot
        animation
        className={wrapperCls}
        xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
        {...passedProps}
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title={xAxisTitle} />
        <YAxis title={yAxisTitle} />
        {
          data.map((item, index) => (
            <RenderComponet
              style={isLineChart && { fill: 'none' }}
              {...getSeriesProps(item, index)}
            />
          ))
        }
        {
          isLineChart &&
          <Highligth
            color={null}
            onBrushEnd={(area) => {
              this.setState({ lastDrawLocation: area })
            }}
          />
        }
        <XAxis title={xAxisTitle} />
        <YAxis title={yAxisTitle} />
      </FlexibleXYPlot>
    )
  }
}

LineChart.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Line chart data  */
  // data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
  //   x: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  //   y: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
  // }))),

  /** Line chart data  */
  xAxisTitle: PropTypes.string,

  /** Line chart data  */
  yAxisTitle: PropTypes.string,

  /** Additional wrapper styles */
  style: PropTypes.object,

  /** Type of chart (line or bar) */
  type: PropTypes.oneOf(['line', 'bar'])
}

LineChart.defaultProps = {
  data: [[{}]],
  lineColors: [],
  xAxisTitle: '',
  yAxisTitle: '',
  type: 'line'
}

export default LineChart
