import React from 'react'
import PropTypes from 'prop-types'
import { FlexibleXYPlot, ArcSeries } from 'react-vis'

import { buildClassName } from '@talixo/shared'

import WithFilters from './WithFiltersHOC'
import { getPieValuesSum, generateArcsData, generateSeriesClassName } from './utils'

const moduleName = 'pie-chart'

const propTypes = {
  /** Additional wrapper class name */
  className: PropTypes.string,

  /** Pie chart data  */
  data: PropTypes.object,

  /** Additional wrapper styles */
  style: PropTypes.object
}

const defaultProps = {
  data: { dataItems: [] }
}

/**
 * Component which represents PieChart.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.data]
 * @param {string} [props.style]
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
      animation
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

PieChart.propTypes = propTypes

PieChart.defaultProps = defaultProps

export default PieChart
export const PieChartWithFilters = WithFilters(PieChart, ['dataItems'])
