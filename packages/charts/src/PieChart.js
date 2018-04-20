import React from 'react'
import PropTypes from 'prop-types'
import { FlexibleXYPlot, ArcSeries } from 'react-vis'

import { buildClassName } from '@talixo/shared'

import { generateArcsData, generateSeriesClassName } from './utils'

const moduleName = 'pie-chart'

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
  const { dataItems = [] } = data
  const wrapperCls = buildClassName(moduleName, className)

  const sum = dataItems
    // TODO: test disable filtering
    .filter(item => !item.disabled)
    .map(item => item.value)
    .reduce((acc, curr) => acc + curr, 0)
  // TODO: test arc data generating
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
