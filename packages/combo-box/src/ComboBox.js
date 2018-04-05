import React from 'react'
import cls from 'classnames'
import Downshift from 'downshift'
import PropTypes from 'prop-types'

import { prefix } from '@talixo/shared'

const name = prefix('combo')

const itemToStringOrObject = i => (i == null ? '' : typeof i === 'object' ? i : String(i))

/**
 * Component which represents dropdown.
 *
 * @param {object} props
 * @param {string} [props.defaultSelectedItem]
 * @param {string} [props.inputComponent]
 * @param {string} [props.itemComponent]
 * @param {string} [props.items]
 * @param {string} [props.maxHeight]
 * @param {string} [props.menuComponent]
 * @param {string} [props.onChange]
 * @param {string} [props.onInputValueChange]
 * @param {string} [props.overflow]
 * @param {string} [props.placeholder]
 * @param {boolean} [props.separated]
 * @param {string} [props.toggleComponent]
 * @returns {React.Element}
 */
const ComboBox = props => {
  const {
    className, menuComponent: MenuComponent, defaultSelectedItem, inputComponent,
    itemComponent, items, loading, maxHeight, onChange, onInputValueChange, overflow, placeholder,
    separated, toggleComponent: ToggleComponent, ...passedProps
  } = props

  return (
    <Downshift
      onChange={onChange}
      onInputValueChange={onInputValueChange}
      defaultSelectedItem={defaultSelectedItem}
      itemToString={itemToStringOrObject}
      render={({
        closeMenu,
        getToggleButtonProps,
        getItemProps,
        getRootProps,
        getInputProps,
        inputValue,
        isOpen,
        openMenu,
        selectedItem,
        highlightedIndex
      }) => (
        <div className={cls(`${name}__wrapper`, className)} {...passedProps}>
          <ToggleComponent
            onOuterClick={() => closeMenu()}
            firstItem={defaultSelectedItem || (items && items.length && items[0]) || ''}
            getToggleButtonProps={getToggleButtonProps}
            getInputProps={getInputProps}
            inputComponent={inputComponent}
            isOpen={isOpen}
            itemComponent={itemComponent}
            overflow={overflow}
            placeholder={placeholder}
            separated={separated}
            value={selectedItem}
          />
          {isOpen ? (
            <MenuComponent
              itemComponent={itemComponent}
              items={items}
              getItemProps={getItemProps}
              highlightedIndex={highlightedIndex}
              loading={loading}
              maxHeight={maxHeight}
              overflow={overflow}
              separated={separated}
              selectedItem={selectedItem}
              inputValue={inputValue}
            />
          ) : null}
        </div>
      )}
    />
  )
}

ComboBox.propTypes = {
  /** Default selected Item */
  defaultSelectedItem: PropTypes.node,

  /** Input component */
  inputComponent: PropTypes.func,

  /** Optional item component */
  itemComponent: PropTypes.func,

  /** Items array */
  items: PropTypes.array,

  /** Loading state */
  loading: PropTypes.bool,

  /** Maximum toggle menu height */
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Toggle menu component */
  menuComponent: PropTypes.func,

  /** Additional onChange function */
  onChange: PropTypes.func,

  /** Called whenever the input value changes */
  onInputValueChange: PropTypes.func,

  /** Item text overflow type */
  overflow: PropTypes.oneOf(['truncate', 'break']),

  /** Placeholder text */
  placeholder: PropTypes.string,

  /** Displays toggle and menu components as separated elements */
  separated: PropTypes.bool,

  /** Toggle component */
  toggleComponent: PropTypes.func
}

export default ComboBox
