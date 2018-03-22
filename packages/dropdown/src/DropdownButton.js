import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'

import { prefix } from '@talixo/commons'

const name = prefix('select')

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
    className,
    firstItem,
    getToggleButtonProps,
    id,
    isOpen,
    itemComponent: ItemComponent,
    onClick,
    overflow,
    placeholder,
    style,
    value
  } = props
  return (
    <button
      {...getToggleButtonProps({
        onClick: onClick
      })}
      className={cls(`${name}-button`, className, {
        [`${name}-open`]: isOpen
      })}
      id={id}
      style={style}
    >
      <span
        className={cls(`${name}-value`, {
          [`${name}-item-overflow-truncate`]: overflow === 'truncate',
          [`${name}-item-overflow-break`]: overflow === 'break'
        })}
      >
        {value ? ItemComponent ? <ItemComponent item={value} /> : value : placeholder || firstItem}
      </span>
      <div className={`${name}-arrow`}>
        <i className='material-icons'>
         arrow_drop_down
        </i>
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
