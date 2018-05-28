import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { buildClassName } from '@talixo/shared'

import ItemList from './ItemList'
import DetailsView from './DetailsView'
import { moduleName } from './config'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  itemRender: PropTypes.func
}

const defaultProps = {
}

/**
 * Component which represents Split View.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class SplitView extends React.Component {
  state = {
    openIndex: this.props.openItem || 0
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.openIndex === this.state.openIndex) {
      this.setState({ openIndex: nextProps.openIndex })
    }
  }

  onClick = (item) => {
    const { openIndex } = this.state
    const { data, onClick, openIndex: propsOpenIndex } = this.props
    const itemIndex = _.findIndex(data, item)

    if (onClick) { onClick(item) }
    if (propsOpenIndex == null && openIndex !== itemIndex) {
      this.setState({ openIndex: itemIndex })
    }
  }

  render () {
    const { onClick } = this
    const { openIndex } = this.state
    const { className, data, detailsRender, itemRender, openItem: propsOpenItem, ...passedProps } = this.props
    const wrapperCls = buildClassName(moduleName, className)
    const displayItem = data[openIndex]

    return (
      <div className={wrapperCls} {...passedProps}>
        <ItemList
          items={data}
          itemRender={itemRender}
          onClick={onClick}
          openIndex={openIndex}
        />
        <DetailsView
          detailsRender={detailsRender}
          item={displayItem}
        />
      </div>
    )
  }
}

SplitView.propTypes = propTypes

SplitView.defaultProps = defaultProps

export default SplitView
