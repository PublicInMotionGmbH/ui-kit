import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { VictoryPie } from 'victory'

import { prefix } from '@talixo/shared'

const moduleName = prefix('pie-chart')

/**
 * Component which represents PieChart.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function PieChart (props) {
  const { className, data, ...passedProps } = props

  return (
    <div className={cls(className, moduleName)}>
      <VictoryPie data={data} {...passedProps} />
    </div>
  )
}

PieChart.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Pie chart data  */
  data: PropTypes.array
}

PieChart.defaultProps = {
}

export default PieChart
