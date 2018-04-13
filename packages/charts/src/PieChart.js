import React from 'react'
import PropTypes from 'prop-types'

import { VictoryPie, VictoryLabel } from 'victory'

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
  const { className, data, labelProps, style, ...passedProps } = props
  const wrapperCls = buildClassName(moduleName, className)

  return (
    <div className={wrapperCls} style={style}>
      <VictoryPie
        data={data}
        labelComponent={<VictoryLabel {...labelProps} />}
        {...passedProps} />
    </div>
  )
}

PieChart.propTypes = {
  /** Additional wrapper class name */
  className: PropTypes.string,

  /** Pie chart data  */
  data: PropTypes.array,

  /** Additional label Props, accepts any VictoryLabel property */
  labelProps: PropTypes.object,

  /** Theme  */
  theme: PropTypes.object,

  /** Additional wrapper styles */
  style: PropTypes.object
}

PieChart.defaultProps = {
}

export default PieChart
