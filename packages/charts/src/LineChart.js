import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { VictoryChart, VictoryLine } from 'victory'

import { prefix } from '@talixo/shared'

const moduleName = prefix('line-chart')

/**
 * Component which represents LineChart.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function LineChart (props) {
  const { className, data, label, ...passedProps } = props

  return (
    <div className={cls(className, moduleName)}>
      <VictoryChart {...passedProps}>
        {
          data.map(itemData => (
            <VictoryLine data={itemData} />
          ))
        }
      </VictoryChart>
    </div>
  )
}

LineChart.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Pie chart data  */
  data: PropTypes.array
}

LineChart.defaultProps = {
  data: []
}

export default LineChart
