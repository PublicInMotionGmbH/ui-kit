import React from 'react'
import PropTypes from 'prop-types'

import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries } from 'react-vis'

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
  const { className, data, ...passedProps } = props
  const wrapperCls = buildClassName(moduleName, className)

  return (
    <FlexibleXYPlot
      xType='ordinal'
      className={wrapperCls}
      {...passedProps}
    >
      <XAxis />
      <YAxis />
      {
        data.map(item => (
          <VerticalBarSeries
            data={item.dataItems}
            color={item.color}
            className={item.className}
          />
        ))
      }
    </FlexibleXYPlot>
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
