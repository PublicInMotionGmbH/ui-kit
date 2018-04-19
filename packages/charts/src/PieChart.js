import React from 'react'
import PropTypes from 'prop-types'
import { FlexibleXYPlot, ArcSeries } from 'react-vis'

import { buildClassName } from '@talixo/shared'

import { generateSeriesClassName } from './config'

const moduleName = 'pie-chart'

function generateArcsData (data, sum, config = {}) {
  const { PI } = Math
  const { startAngle = 0, radius0 = 0, radius = 5 } = config

  let angle0 = startAngle
  const newData = data.map(item => {
    if (item.disabled) return item
    const arcAngle = (item.value / sum) * 2 * PI
    const newItem = {
      ...item,
      angle: arcAngle + angle0,
      angle0,
      radius,
      radius0
    }
    angle0 += arcAngle
    return newItem
  })
  return newData
}

/**
 * Component which represents PieChart.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function PieChart (props) {
  const {
    arcsProps,
    className,
    data,
    style,
    ...passedProps
  } = props
  const { dataItems } = data
  const wrapperCls = buildClassName(moduleName, className)

  const sum = dataItems
    .filter(item => !item.disabled)
    .map(item => item.value)
    .reduce((acc, curr) => acc + curr, 0)
  const displayData = generateArcsData(dataItems, sum)

  return (
    <FlexibleXYPlot
      xDomain={[-5, 5]}
      yDomain={[-5, 5]}
      className={wrapperCls}
      style={style}
      {...passedProps}
    >
      {
        displayData.map((item, index) => (
          <ArcSeries
            center={{ x: 0, y: 0 }}
            data={[item]}
            key={generateSeriesClassName(item.id || index)}
            className={generateSeriesClassName(item.id || index, item.className)}
            {...arcsProps}
          />
        ))
      }
    </FlexibleXYPlot>
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
