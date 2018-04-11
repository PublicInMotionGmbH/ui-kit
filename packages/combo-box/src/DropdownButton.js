import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@talixo/icon'
import { buildClassName, applyAnyClassNameModifiers } from '@talixo/shared'

/**
 * Dropdown button component.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.firstItem]
 * @param {string} [props.getToggleButtonProps]
 * @param {string} [props.id]
 * @param {string} [props.isOpen]
 * @param {string} [props.itemComponent]
 * @param {string} [props.onClick]
 * @param {string} [props.overflow]
 * @param {string} [props.placeholder]
 * @param {boolean} [props.separated]
 * @param {string} [props.value]
 * @returns {React.Element}
 */

const DropdownButton = props => {
  const {
    className, firstItem, getToggleButtonProps,
    id, isOpen, itemComponent: ItemComponent,
    onClick, overflow, placeholder, separated, style, value
  } = props

  // We've got modifier here of the combo-box directly, but probably it should be `input` modifier
  const openClsName = applyAnyClassNameModifiers('combo-box', { open: isOpen })

  // Build class name for button
  const buttonClsName = buildClassName(
    [ 'combo-box', 'button' ],
    [ className, openClsName ],
    { separated: isOpen && separated }
  )

  // We've got modifier here of the combo-box item, but we are attaching to to combo-box value
  const itemClsName = applyAnyClassNameModifiers([ 'combo-box', 'item' ], {
    'overflow-truncate': overflow === 'truncate',
    'overflow-break': overflow === 'break'
  })

  // Build class name for value `span`
  const spanClsName = buildClassName([ 'combo-box', 'value' ], itemClsName)

  // Build class name for arrow
  const arrowClsName = buildClassName([ 'combo-box', 'arrow' ])

  // Build class name for arrow
  const arrowIconClsName = applyAnyClassNameModifiers([ 'combo-box', 'arrow' ], 'down')

  const displayedValue = value != null
    ? value
    : placeholder || firstItem

  const displayedItem = (ItemComponent && value != null) || (ItemComponent && !placeholder)
    ? <ItemComponent item={displayedValue} />
    : displayedValue

  return (
    <button
      {...getToggleButtonProps({
        onClick: onClick
      })}
      className={buttonClsName}
      id={id}
      style={style}
    >
      <span
        className={spanClsName}
      >
        {displayedItem}
      </span>
      <div className={arrowClsName}>
        <Icon name='arrow_drop_down' className={arrowIconClsName} />
      </div>
    </button>
  )
}

DropdownButton.propTypes = {

  /** Additional class name */
  className: PropTypes.string,

  /** First item in array */
  firstItem: PropTypes.any,

  /** Returns the props applied to menu button */
  getToggleButtonProps: PropTypes.func,

  /** Additional id */
  id: PropTypes.string,

  /** Controls whether the menu should be open */
  isOpen: PropTypes.bool,

  /** Optional item component */
  itemComponent: PropTypes.func,

  /** Called on click */
  onClick: PropTypes.func,

  /** Item text overflow type */
  overflow: PropTypes.oneOf(['truncate', 'break']),

  /** Placeholder text */
  placeholder: PropTypes.string,

  /** Displays button as separated element */
  separated: PropTypes.bool,

  /** Style object */
  style: PropTypes.object,

  /** The currently selected item */
  value: PropTypes.any
}

DropdownButton.defaultProps = {
  getToggleButtonProps: props => props
}

export default DropdownButton
