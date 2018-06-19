import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { buildClassName } from '@talixo/shared'

import Legend from './Legend'

const moduleName = 'filtered-chart'

const propTypes = {
  /** Position of the legend relative to chart. */
  legendPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /** Additional props to be passed to legend. Accepts any property which is allowed for Legend Component. */
  legendProps: PropTypes.object,

  /** Path to data items that will be filtered. */
  pathToDataItems: PropTypes.array
}

const defaultProps = {
  legendPosition: 'top',
  legendProps: {},
  pathToDataItems: []
}

/**
 * @property {object} [props]
 * @property {string} [props.legendPosition]
 * @property {object} [props.legendProps]
 *
 * @property {object} [state]
 * @property {object} [props.modifiedData]
 * @class
 */
class FilterableChart extends React.Component {
  state = {
    modifiedData: this.getDataFromChildren()
  }

  /**
   * Returns data array or object from children component
   *
   * @return {array|object}
   */
  getDataFromChildren () {
    const children = React.Children.only(this.props.children)
    return _.get(children, 'props.data')
  }

  /**
   * Changes disable property of item selected from legend
   *
   * @param item
   * @param filteredIndex
   */
  onFilterClick = (filteredItem, filteredIndex) => {
    const { legendProps: { onClick }, pathToDataItems } = this.props
    const { modifiedData } = this.state
    const dataIsArray = _.isArray(modifiedData)
    const newData = _.get(modifiedData, pathToDataItems, modifiedData).map((item, index) => {
      return index === filteredIndex
        ? { ...item, disabled: !item.disabled }
        : item
    })
    const enabledItems = newData.filter(item => !item.disabled)

    // Do not allow filtering out all elements
    if (enabledItems < 1) return

    this.setState({
      modifiedData: !dataIsArray
        ? _.set(modifiedData, pathToDataItems, newData)
        : newData
    })
    if (onClick) { onClick(filteredItem, filteredIndex) }
  }

  render () {
    const {
      className, data,
      legendProps: { onClick, ...restLegendProps },
      legendPosition, pathToDataItems, ...restProps
    } = this.props
    const { modifiedData } = this.state
    const { onFilterClick } = this

    const legendData = _.get(modifiedData, pathToDataItems, modifiedData)
    const wrapperCls = buildClassName(moduleName, className, [legendPosition])
    const chartCls = buildClassName([moduleName, 'chart'])
    const legendCls = buildClassName([moduleName, 'legend'])
    const legendHorizontal = legendPosition === 'top' || legendPosition === 'bottom'
    const legendDirection = legendHorizontal ? 'horizontal' : 'vertical'

    const chartStyles = legendHorizontal
      ? { height: '80%', width: '100%' }
      : { height: '100%', width: '85%' }

    const chart = React.Children.only(this.props.children)
    const chartProps = chart.props

    return (
      <div style={{height: '100%', width: '100%'}} className={wrapperCls} {...restProps}>
        <Legend
          className={legendCls}
          dataItems={legendData}
          direction={legendDirection}
          onClick={onFilterClick}
          {...restLegendProps}
        />
        <div style={chartStyles} className={chartCls}>
          { React.cloneElement(chart, { ...chartProps, data: modifiedData }) }
        </div>
      </div>
    )
  }
}

FilterableChart.propTypes = propTypes

FilterableChart.defaultProps = defaultProps

export default FilterableChart
