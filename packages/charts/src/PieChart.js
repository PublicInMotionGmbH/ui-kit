import React from 'react'
import PropTypes from 'prop-types'
// import { VictoryPie, VictoryLabel } from 'victory'
import { RadialChart } from 'react-vis'

import { buildClassName } from '@talixo/shared'

import { colors } from './config'

const moduleName = 'pie-chart'

const scaleRadius = (size, scale) => {
  return size * scale
}

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
  const minDimension = Math.min(height, width)
  const radius = showLabels
    ? scaleRadius(minDimension, 0.3)
    : minDimension

  return (
    <div className={wrapperCls} style={style}>
      <RadialChart
        data={data}
        height={height}
        width={width}
        radius={radius}
        colorRange={colors}
        labelsRadiusMultiplier={1.4}
        showLabels={showLabels}
        {...passedProps}
      />
    </div>
  )
}

PieChart.propTypes = {
  /** Additional wrapper class name */
  className: PropTypes.string,

  /** Pie chart data  */
  data: PropTypes.array,

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
  width: 200,
  showLabels: false
}

export default PieChart
