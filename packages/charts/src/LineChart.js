import React from 'react'
import PropTypes from 'prop-types'
import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  LineSeries,
  HorizontalGridLines,
  VerticalGridLines
} from 'react-vis'

// import { buildClassName } from '@talixo/shared'

import Highligth from './Highlight'

// import { talixoTheme, getColorByIndex } from './config'

// const moduleName = 'line-chart'

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
  render () {
    const { lastDrawLocation } = this.state
    const {
      className,
      data,
      lineProps,
      xAxisTitle,
      yAxisTitle,
      style,
      ...passedProps
    } = this.props
    // const wrapperCls = buildClassName(moduleName, className)

    return (
      <FlexibleXYPlot
        animation
        xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
        {...passedProps}
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title={xAxisTitle} position='start' />
        <YAxis title={yAxisTitle} />
        {
          data.map((item, index) => {
            return (
              <LineSeries
                data={item.dataItems}
                color={item.color}
                className={item.className} />
            )
          })
        }
        <Highligth
          color={null}
          onBrushEnd={(area) => {
            this.setState({ lastDrawLocation: area })
          }}
        />
      </FlexibleXYPlot>
    )
  }
}

LineChart.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Line chart data  */
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    y: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
  }))),

  /** Line chart data  */
  xAxisTitle: PropTypes.string,

  /** Line chart data  */
  yAxisTitle: PropTypes.string,

  /** Additional wrapper styles */
  style: PropTypes.object
}

LineChart.defaultProps = {
  data: [[{}]],
  lineColors: [],
  xAxisTitle: '',
  yAxisTitle: ''
}

export default LineChart
