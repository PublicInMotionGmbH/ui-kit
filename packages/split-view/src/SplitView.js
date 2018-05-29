import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

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
  detailsRender: PropTypes.func,

  /** Render function of list section. */
  itemRender: PropTypes.func,

  /** Header element of list section. */
  listHeader: PropTypes.node,

  /** onSelect callback. */
  onSelect: PropTypes.func,

  /** Index of opened element. */
  openIndex: PropTypes.number
}

/**
 * Component which represents Split View.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {object[]} props.data
 * @property {function} [props.detailsRender]
 * @property {function} [props.itemRender]
 * @property {*} [props.listHeader]
 * @property {function} [props.onSelect]
 * @property {number} [props.openIndex]
 *
 * @property {object} state
 * @property {number} state.openIndex
 *
 * @class
 */
class SplitView extends React.Component {
  state = {
    openIndex: this.props.openIndex || 0
  }

  /**
   * Update index of opened element if it has been changed.
   *
   * @param {object} nextProps
   * @param {object} [nextProps.openIndex]
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.openIndex !== this.state.openIndex) {
      this.setState({ openIndex: nextProps.openIndex })
    }
  }

  /**
   * Update opnened element if it has been changed by clicking
   * the list element and invoke props.onSelect function.
   *
   * @param {object} item
   */
  onClick = (item) => {
    const { openIndex } = this.state
    const { data, onSelect, openIndex: propsOpenIndex } = this.props
    const itemIndex = _.findIndex(data, item)

    if (onSelect) { onSelect(item) }
    if (propsOpenIndex == null && openIndex !== itemIndex) {
      this.setState({ openIndex: itemIndex })
    }
  }
  /**
   * Generates header component if provided.
   */
  generateHeader = () => {
    const { listHeader } = this.props

    const headerCls = buildClassName([moduleName, 'header'], listHeader.props.className)
    return React.cloneElement(listHeader, { ...listHeader.props, className: headerCls })
  }

  render () {
    const { onClick, generateHeader } = this
    const { openIndex } = this.state
    const { className, data, detailsRender, itemRender, listHeader, onSelect, openIndex: propsOpenIndex, ...passedProps } = this.props

    // Class Names
    const wrapperCls = buildClassName(moduleName, className)
    const panelCls = buildClassName([moduleName, 'side-panel'], className)
    const displayItem = data[openIndex]

    return (
      <div className={wrapperCls} {...passedProps}>
        <div className={panelCls}>
          { listHeader && generateHeader() }
          <ItemList
            items={data}
            itemRender={itemRender}
            onClick={onClick}
            openIndex={openIndex}
          />
        </div>
        <DetailsView
          detailsRender={detailsRender}
          item={displayItem}
        />
      </div>
    )
  }
}

SplitView.propTypes = propTypes

export default SplitView
