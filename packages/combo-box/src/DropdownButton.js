import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'

import Icon from '@talixo/icon'
import { prefix } from '@talixo/shared'

const moduleName = prefix('select')

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
 * @param {string} [props.value]
 * @returns {React.Element}
 */

const DropdownButton = props => {
  const {
    className, firstItem, getToggleButtonProps,
    id, isOpen, itemComponent: ItemComponent,
    onClick, overflow, placeholder, style, value
  } = props

  const buttonClsName = cls(className, `${moduleName}__button`, {
    [`${moduleName}--open`]: isOpen
  })

  const spanClsName = cls(`${moduleName}__value`, {
    [`${moduleName}__item--overflow-truncate`]: overflow === 'truncate',
    [`${moduleName}__item--overflow-break`]: overflow === 'break'
  })
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
      <div className={`${moduleName}__arrow`}>
        <Icon name={'arrow_drop_down'} className={`${moduleName}__arrow--down`} />
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

  /** Style object */
  style: PropTypes.object,

  /** The currently selected item */
  value: PropTypes.any
}

DropdownButton.defaultProps = {
  getToggleButtonProps: props => props
}

export default DropdownButton
