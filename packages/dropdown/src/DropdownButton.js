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
 * @param {string} [props.getButtonProps]
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
    getButtonProps,
    id,
    isOpen,
    itemComponent: ItemComponent,
    onClick,
    overflow,
    placeholder,
    value
  } = props
  return (
    <button
      {...getButtonProps({
        onClick: onClick
      })}
      className={cls(`${name}-button`, className, {
        [`${name}-open`]: isOpen
      })}
      id={id}
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
  className: PropTypes.string,
  firstItem: PropTypes.any,
  getButtonProps: PropTypes.func,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  itemComponent: PropTypes.func,
  onClick: PropTypes.func,
  overflow: PropTypes.oneOf(['truncate', 'break']),
  placeholder: PropTypes.string,
  value: PropTypes.any
}

DropdownButton.defaultProps = {
  getButtonProps: props => props
}

export default DropdownButton
