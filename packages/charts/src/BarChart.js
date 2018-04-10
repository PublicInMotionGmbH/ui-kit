import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { VictoryChart, VictoryBar, VictoryTheme } from 'victory'

import { prefix } from '@talixo/shared'

const moduleName = prefix('bar-chart')

/**
 * Component which represents BarChart.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {array} [props.data]
 * @returns {React.Element}
 */
function BarChart (props) {
  const { categories, className, data, ...passedProps } = props

  return (
    <div className={cls(className, moduleName)}>
      <VictoryChart theme={VictoryTheme.material} {...passedProps}>
        <VictoryBar key={data.x} data={data} categories={categories} />
      </VictoryChart>
    </div>
  )
}

BarChart.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Bar chart data  */
  data: PropTypes.array
}

BarChart.defaultProps = {
  data: []
}

export default BarChart
