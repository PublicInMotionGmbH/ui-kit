import React from 'react'
import PropTypes from 'prop-types'
import {
  XYPlot,
  // FlexibleXYPlot,
  ArcSeries,
  RadialChart
} from 'react-vis'

import { buildClassName } from '@talixo/shared'

const moduleName = 'pie-chart'

/**
 * Component which represents PieChart.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function PieChart (props) {
  const { className, data, height, width, showLabels, style, ...passedProps } = props
  const wrapperCls = buildClassName(moduleName, className)
  const { PI } = Math
  const myData = [
    {angle0: 0, angle: 2 * PI / 4, radius: 4, radius0: 0, color: ' '}
    // {angle0: 2 * PI / 4, angle: 3 * PI / 4, radius: 4, radius0: 0},
    // {angle0: 3 * PI / 4, angle: 4 * PI / 4, radius: 4, radius0: 0},
    // {angle0: 4 * PI / 4, angle: 5 * PI / 4, radius: 4, radius0: 0},
  ]
  const myData2 = [{angle0: 2 * PI / 4, angle: 3 * PI / 4, radius: 4, radius0: 0, color: ' '}]

  return (
    <div className={wrapperCls} style={style}>
      <XYPlot
        width={500}
        height={500}
        xDomain={[-5, 5]}
        yDomain={[-5, 5]}
      >
        <ArcSeries
          center={{ x: 0, y: 0 }}
          radiusType={'linear'}
          data={myData}
          className={`talixo-charts__series--0`}
        />
        <ArcSeries
          center={{ x: 0, y: 0 }}
          radiusType={'linear'}
          data={myData2}
          className={`talixo-charts__series--1`}
        />
      </XYPlot>
      <RadialChart
        data={data.dataItems}
        height={height}
        width={width}
        labelsAboveChildrens
        {...passedProps}
      />
    </div>
  )
}

PieChart.propTypes = {
  /** Additional wrapper class name */
  className: PropTypes.string,

  /** Pie chart data  */
  data: PropTypes.object,

  /** Pie chart data  */
  height: PropTypes.number,

  /** Pie chart data  */
  width: PropTypes.number,

  /** Indicates if chart should show labels */
  showLabels: PropTypes.bool,

  /** Additional wrapper styles */
  style: PropTypes.object
}

PieChart.defaultProps = {
  height: 500,
  width: 500,
  showLabels: false
}

export default PieChart
