import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { Icon } from '@talixo/icon'

const propTypes = {
  /** Item to show */
  item: PropTypes.any.isRequired,

  /** Function to build 'remove' button props with handlers */
  getRemoveButtonProps: PropTypes.func.isRequired,

  /** Function to render item value */
  renderValue: PropTypes.func.isRequired
}

/**
 * Component which represents value tag in multi-select elements.
 *
 * @param {object} props
 * @param {*} props.item
 * @param {function} props.getRemoveButtonProps
 * @param {function} props.renderValue
 *
 * @returns {React.Element}
 */
function Tag (props) {
  const { item, getRemoveButtonProps, renderValue } = props

  // Build props required for 'remove' button
  const passedProps = getRemoveButtonProps({ item })

  // Build class names for all elements
  const clsName = buildClassName([ 'combo-box', 'tag' ])
  const innerClsName = buildClassName([ 'combo-box', 'tag', 'inner' ])
  const removeClsName = buildClassName([ 'combo-box', 'remove' ])

  return (
    <span className={clsName}>
      <span className={innerClsName}>
        {renderValue(item, props)}
      </span>
      <span role='button' aria-label='remove value' className={removeClsName} {...passedProps}>
        <Icon name='clear' />
      </span>
    </span>
  )
}

Tag.propTypes = propTypes

export default Tag
