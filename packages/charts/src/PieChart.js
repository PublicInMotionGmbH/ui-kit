import React from 'react'
import PropTypes from 'prop-types'
import { FlexibleXYPlot, ArcSeries } from 'react-vis'

import { buildClassName } from '@talixo/shared'

import { getPieValuesSum, generateArcsData, generateSeriesClassName } from './utils'

const moduleName = 'pie-chart'

const propTypes = {
  /** Additional props that are passed to react-vis ArcSeries. */
  arcProps: PropTypes.object,

  /** Additional wrapper class name. */
  className: PropTypes.string,

  /** Pie chart data.  */
  data: PropTypes.shape({

    /** Data items to be displayed on the pie chart. */
    dataItems: PropTypes.arrayOf(PropTypes.shape({

      /** Additional class name of react-vis ArcSeries. */
      className: PropTypes.string,

      /** Color of the arc. */
      color: PropTypes.string,

      /** Idicates if item should be disabled. */
      disabled: PropTypes.bool,

      /** Label of the data series. */
      label: PropTypes.string,

      /** Value of data series. */
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })),

    /** Title of chart. */
    title: PropTypes.string
  })
}

const defaultProps = {
  data: { dataItems: [] }
}

/**
 * Component which represents PieChart.
 *
 * @param {object} props
 * @param {string} [props.arcProps]
 * @param {string} [props.className]
 *
 * @param {object} [props.data]
 * @param {object[]} [props.data.dataItems]
 * @param {string} [props.data.dataItems.className]
 * @param {string} [props.data.dataItems.color]
 * @param {boolean} [props.data.dataItems.disabled]
 * @param {string} [props.data.dataItems.label]
 * @param {number|string} [props.data.dataItems.value]
 * @param {string} [props.data.title]
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
      {...passedProps}
    >
      {
        displayData.map((item, index) => {
          const arcCls = generateSeriesClassName(index, item.className)
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

PieChart.displayName = 'PieChart'

export default PieChart
