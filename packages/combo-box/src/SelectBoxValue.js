import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { Icon } from '@talixo/icon'

import TagsList from './TagsList'

const propTypes = {
  /** Function to build toggle props with handlers */
  getToggleButtonProps: PropTypes.func.isRequired,

  /** Function to render item value */
  renderValue: PropTypes.func.isRequired,

  /** Additional icon to put in the select box */
  icon: PropTypes.node,

  /** Is it multi-select? */
  multi: PropTypes.bool,

  /** Placeholder to show when there is no value */
  placeholder: PropTypes.node,

  /** Is menu open? */
  isOpen: PropTypes.bool,

  /** List of currently selected items */
  selectedItems: PropTypes.array
}

const defaultProps = {
  multi: false,
  isOpen: false,
  selectedItems: []
}

/**
 * Value shown in SelectBox.
 *
 * @param {object} props
 * @param {function} props.getToggleButtonProps
 * @param {function} props.renderValue
 * @param {boolean} props.multi
 * @param {boolean} props.isOpen
 * @param {array} props.selectedItems
 * @param {*} [props.icon]
 * @param {*} [props.placeholder]
 *
 * @returns {React.Element}
 */
function SelectBoxValue (props) {
  const { getToggleButtonProps, icon, multi, tabIndex, placeholder, isOpen, selectedItems, renderValue } = props

  // Get information about selection
  const isSelected = selectedItems.length > 0

  // Get properties required by toggle button
  const passedProps = getToggleButtonProps()

  if (tabIndex != null) {
    passedProps.tabIndex = tabIndex
  }

  // Build class names for elements
  const controlsClsName = buildClassName([ 'combo-box', 'controls' ])
  const innerClsName = buildClassName([ 'combo-box', 'inner' ])
  const arrowClsName = buildClassName([ 'combo-box', 'arrow' ])
  const iconClsName = buildClassName([ 'combo-box', 'icon' ])
  const clsName = buildClassName([ 'combo-box', 'value' ], null, { placeholder: !isSelected })

  // Build icon
  const iconElement = icon ? <div className={iconClsName}>{icon}</div> : null
  const arrow = <Icon name={isOpen ? 'expand_less' : 'expand_more'} />

  // Build controls
  const controls = (
    <div className={controlsClsName}>
      {iconElement}
      <div className={arrowClsName}>{arrow}</div>
    </div>
  )

  // Build component to show value
  const value = multi && isSelected
    ? <TagsList {...props} />
    : isSelected ? renderValue(selectedItems[0], props) : placeholder

  // Render select-box value container
  return (
    <button {...passedProps} className={clsName}>
      <div className={innerClsName}>
        {value}
      </div>
      {controls}
    </button>
  )
}

SelectBoxValue.propTypes = propTypes
SelectBoxValue.defaultProps = defaultProps

export default SelectBoxValue
