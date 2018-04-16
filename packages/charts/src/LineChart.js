import React from 'react'
import PropTypes from 'prop-types'
import { VictoryChart, VictoryLine } from 'victory'

import { buildClassName } from '@talixo/shared'

import { talixoTheme, getColorByIndex } from './config'

const moduleName = 'line-chart'

/**
 * Component which represents LineChart.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function LineChart (props) {
  const { className, data, lineProps, style, ...passedProps } = props
  const wrapperCls = buildClassName(moduleName, className)

  return (
    <div className={wrapperCls} style={style}>
      <VictoryChart theme={talixoTheme} {...passedProps}>
        {
          data.map((itemData, index) => (
            <VictoryLine
              theme={talixoTheme}
              data={itemData}
              style={{
                data: {
                  stroke: getColorByIndex(index + 3), strokeWidth: 3
                }}}
              {...lineProps}
            />
          ))
        }
      </VictoryChart>
    </div>
  )
}

LineChart.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Line chart data  */
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOf([ PropTypes.string, PropTypes.number ]),
    y: PropTypes.oneOf([ PropTypes.string, PropTypes.number ])
  }))),

  /** Additional line props, accepts any VictoryLine property */
  lineProps: PropTypes.object,

  /** Line colors */
  lineColors: PropTypes.array,

  /** Additional wrapper styles */
  style: PropTypes.object
}

LineChart.defaultProps = {
  data: [[{}]],
  lineColors: []
}

export default LineChart
