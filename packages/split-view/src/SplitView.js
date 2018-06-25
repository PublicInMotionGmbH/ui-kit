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

  /** onSelect callback. */
  onSelect: PropTypes.func,

  /** Opened element. */
  openedItem: PropTypes.object
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
 * @property {function} [props.onSelect]
 * @property {number} [props.openedItem]
 *
 * @property {object} state
 * @property {object} state.openedItem
 *
 * @class
 */
class SplitView extends React.Component {
  state = {
    openedItem: this.props.openedItem || this.props.data[0]
  }

  /**
   * Update index of opened element if it has been changed.
   *
   * @param {object} nextProps
   * @param {object} [nextProps.openedItem]
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.openedItem !== this.state.openedItem) {
      this.setState({ openedItem: nextProps.openedItem })
    }
  }

  /**
   * Update opnened element if it has been changed by clicking
   * the list element and invoke props.onSelect function.
   *
   * @param {object} item
   */
  onClick = (item, ...args) => {
    const { openedItem } = this.state
    const { onSelect, openedItem: propsOpenedItem } = this.props

    if (onSelect) { onSelect(item, ...args) }
    if (propsOpenedItem == null && openedItem !== item) {
      this.setState({ openedItem: item })
    }
  }
  /**
   * Generates header component if provided.
   */
  generateHeader = () => {
    const { listHeader } = this.props
    const headerCls = buildClassName([moduleName, 'header'], listHeader.props.className)
    return React.cloneElement(listHeader, { className: headerCls })
  }

  render () {
    const { onClick, generateHeader } = this
    const { openedItem } = this.state
    const { className, data, renderDetails, renderItems, listHeader, onSelect, openedItem: propsOpenedItem, ...passedProps } = this.props

    // Class Names
    const wrapperCls = buildClassName(moduleName, className)
    const panelCls = buildClassName([moduleName, 'side-panel'], className)

    return (
      <div className={wrapperCls} {...passedProps}>
        <div className={panelCls}>
          { listHeader && generateHeader() }
          <ItemList
            items={data}
            renderItems={renderItems}
            onClick={onClick}
            openedItem={openedItem}
          />
        </div>
        <DetailsView
          renderDetails={renderDetails}
          openedItem={openedItem}
        />
      </div>
    )
  }
}

SplitView.propTypes = propTypes

export default SplitView
