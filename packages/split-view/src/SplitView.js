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

  /** Opened element. */
  openItem: PropTypes.object
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
 * @property {number} [props.openItem]
 *
 * @property {object} state
 * @property {object} state.openItem
 *
 * @class
 */
class SplitView extends React.Component {
  state = {
    openItem: this.props.openItem || this.props.data[0]
  }

  /**
   * Update index of opened element if it has been changed.
   *
   * @param {object} nextProps
   * @param {object} [nextProps.openItem]
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.openItem !== this.state.openItem) {
      this.setState({ openItem: nextProps.openItem })
    }
  }

  /**
   * Update opnened element if it has been changed by clicking
   * the list element and invoke props.onSelect function.
   *
   * @param {object} item
   */
  onClick = (item) => {
    const { openItem } = this.state
    const { data, onSelect, openItem: propsOpenItem } = this.props
    const itemIndex = _.findIndex(data, item)

    if (onSelect) { onSelect(item) }
    if (propsOpenItem == null && openItem !== itemIndex) {
      this.setState({ openItem: item })
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
    const { openItem } = this.state
    const { className, data, detailsRender, itemRender, listHeader, onSelect, openItem: propsOpenItem, ...passedProps } = this.props

    // Class Names
    const wrapperCls = buildClassName(moduleName, className)
    const panelCls = buildClassName([moduleName, 'side-panel'], className)

    return (
      <div className={wrapperCls} {...passedProps}>
        <div className={panelCls}>
          { listHeader && generateHeader() }
          <ItemList
            items={data}
            itemRender={itemRender}
            onClick={onClick}
            openItem={openItem}
          />
        </div>
        <DetailsView
          detailsRender={detailsRender}
          item={openItem}
        />
      </div>
    )
  }
}

SplitView.propTypes = propTypes

export default SplitView
