import React from 'react'
import PropTypes from 'prop-types'

import { VictoryChart, VictoryBar } from 'victory'

import { buildClassName } from '@talixo/shared'

const moduleName = 'bar-chart'

/**
 * Component which represents BarChart.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {array} [props.data]
 * @returns {React.Element}
 */
function BarChart (props) {
  const { categories, className, data, style, ...passedProps } = props
  const wrapperCls = buildClassName(moduleName, className)

  return (
    <div className={wrapperCls} style={style}>
      <VictoryChart {...passedProps}>
        <VictoryBar key={data.x} data={data} categories={categories} />
      </VictoryChart>
    </div>
  )
}

BarChart.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Bar chart data  */
  data: PropTypes.array,

  /** Additional wrapper styles */
  style: PropTypes.object
}

BarChart.defaultProps = {
  data: []
}

export default BarChart
