import React from 'react'
import PropTypes from 'prop-types'
import { FlexibleXYPlot, ArcSeries } from 'react-vis'

import { buildClassName } from '@talixo/shared'

import { getPieValuesSum, generateArcsData, generateSeriesClassName } from './utils'

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
  const { dataItems } = data
  const wrapperCls = buildClassName(moduleName, className)
  const sum = getPieValuesSum(dataItems)
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
        displayData.map((item, index) => {
          const arcCls = generateSeriesClassName(index)
          return !item.disabled
            ? <ArcSeries
              center={{ x: 0, y: 0 }}
              data={[item]}
              key={arcCls}
              className={arcCls}
              {...arcsProps}
            />
            : null
        })
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
  data: { dataItems: [] },
  height: 500,
  width: 500,
  showLabels: false
}

export default PieChart
