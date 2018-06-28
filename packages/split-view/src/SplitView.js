import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import ItemList from './ItemList'
import DetailsView from './DetailsView'
import { moduleName } from './config'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Data to be displayed inside SplitView component. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** Render function of details section. */
  renderDetails: PropTypes.func,

  /** Render function of list section. */
  renderItems: PropTypes.func,

  /** Header element of list section. */
  listHeader: PropTypes.node,

  /** onChange callback. */
  onChange: PropTypes.func,

  /** Opened element. */
  value: PropTypes.object
}

/**
 * Component which represents Split View.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {object[]} props.data
 * @property {function} [props.renderDetails]
 * @property {function} [props.renderItems]
 * @property {*} [props.listHeader]
 * @property {function} [props.onChange]
 * @property {number} [props.value]
 *
 * @property {object} state
 * @property {object} state.value
 *
 * @class
 */
class SplitView extends React.Component {
  state = {
    value: this.props.value || this.props.data[0]
  }

  /**
   * Update index of opened element if it has been changed.
   *
   * @param {object} nextProps
   * @param {object} [nextProps.value]
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  /**
   * Update opnened element if it has been changed by clicking
   * the list element and invoke props.onChange function.
   *
   * @param {object} item
   */
  onClick = (item, ...args) => {
    const { value } = this.state
    const { onChange, value: propsValue } = this.props

    if (onChange) { onChange(item, ...args) }
    if (propsValue == null && value !== item) {
      this.setState({ value: item })
    }
  }
  /**
   * Generates header component if provided.
   */
  renderHeader = () => {
    const { listHeader } = this.props
    const headerCls = buildClassName([moduleName, 'header'], listHeader.props.className)
    return React.cloneElement(listHeader, { className: headerCls })
  }

  render () {
    const { onClick, renderHeader } = this
    const { value } = this.state
    const { className, data, renderDetails, renderItems, listHeader, onChange, value: propsValue, ...passedProps } = this.props

    // Class Names
    const wrapperCls = buildClassName(moduleName, className)
    const panelCls = buildClassName([moduleName, 'side-panel'], className)

    return (
      <div className={wrapperCls} {...passedProps}>
        <div className={panelCls}>
          { listHeader && renderHeader() }
          <ItemList
            items={data}
            renderItems={renderItems}
            onClick={onClick}
            value={value}
          />
        </div>
        <DetailsView
          renderDetails={renderDetails}
          value={value}
        />
      </div>
    )
  }
}

SplitView.propTypes = propTypes

export default SplitView
