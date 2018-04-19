import React from 'react'
import PropTypes from 'prop-types'
import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries } from 'react-vis'

import { buildClassName } from '@talixo/shared'

import { generateSeriesClassName } from './config'

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
  const {
    dataSeriesProps,
    className,
    data,
    styles,
    ...passedProps
  } = props
  const wrapperCls = buildClassName(moduleName, className)

  return (
    <FlexibleXYPlot
      xType='ordinal'
      className={wrapperCls}
      styles={styles}
      {...passedProps}
    >
      <XAxis />
      <YAxis />
      {
        data.map((item, index) => (
          <VerticalBarSeries
            data={item.dataItems}
            color={item.color}
            className={generateSeriesClassName(item.id || index)}
            key={generateSeriesClassName(item.id || index, item.className)}
            {...dataSeriesProps}
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
