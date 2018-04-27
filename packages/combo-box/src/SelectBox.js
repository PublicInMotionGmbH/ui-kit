import React from 'react'
import PropTypes from 'prop-types'

import Downshift from 'downshift'

import { buildClassName } from '@talixo/shared'

import Menu from './Menu'
import SelectBoxValue from './SelectBoxValue'

const moduleName = 'combo-box'

/**
 * Component which represents Combo box.
 *
 * @property {object} props
 * @property {array} props.options
 * @property {boolean} props.multi
 * @property {function} props.renderItem
 * @property {function} props.buildItemId
 * @property {function} props.itemToString
 * @property {*} [props.placeholder]
 * @property {function} [props.renderValue]
 * @property {string} [props.className]
 *
 * @class
 */
class SelectBox extends React.PureComponent {
  /**
   * Handle state changes inside of Downshift component.
   * We need it to not close menu after element is clicked in multi-select.
   *
   * @param {object} state
   * @param {object} changes
   * @returns {object}
   */
  stateReducer (state, changes) {
    const { multi } = this.props

    switch (changes.type) {
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          inputValue: '',
          isOpen: multi
        }
      default:
        return changes
    }
  }

  /**
   * Get props which should be passed through our components below Downshift.
   *
   * @param {object} data
   * @returns {object}
   */
  getStateProps (data) {
    const { value, icon, options, multi, placeholder, buildItemId, renderItem, renderValue } = this.props

    return {
      ...data,
      ...{ icon, options, multi, placeholder, buildItemId, renderItem },
      renderValue: renderValue || renderItem,
      getRemoveButtonProps: this.getRemoveButtonProps.bind(this),
      selectedItems: value == null ? [] : [].concat(value)
    }
  }

  /**
   * Build props for 'remove' button.
   *
   * @param {object} props
   * @returns {object|{ onClick: function }}
   */
  getRemoveButtonProps (props) {
    const { onClick, item, ...passedProps } = props || {}

    // Build handler for 'onClick' event
    const nextOnClick = e => {
      if (onClick) {
        onClick(e)
      }

      // Do not propagate click on 'remove' button - it may cause strange operations on Downshift
      e.stopPropagation()

      // Select again (= unselect) current element
      this.select(item)
    }

    return {
      onClick: nextOnClick,
      ...passedProps
    }
  }

  /**
   * Handle item selection.
   *
   * @param {object} item
   */
  select (item) {
    const { onChange, multi, value } = this.props

    // Handle simple selection for single select-box
    if (!multi) {
      onChange(item)
      return
    }

    // Build array of current values
    const _value = value == null ? [] : [].concat(value)

    // Remove existing or add new item to value
    const nextValue = _value.indexOf(item) !== -1
      ? _value.filter(x => x !== item)
      : _value.concat(item)

    // Trigger event with new value
    if (onChange) {
      onChange(nextValue)
    }
  }

  /**
   * Render component in Downshift flow
   *
   * @param {object} _data
   * @returns {React.Element}
   */
  renderComponent (_data) {
    // Compose Downshift & our properties
    const data = this.getStateProps(_data)

    // Get required data to render component
    const { className } = this.props
    const { isOpen, options, multi, icon } = data

    // Check if menu should be visible
    const open = isOpen && options.length > 0

    // Build class name for wrapper
    const clsName = buildClassName(moduleName, className, { open, multi, 'with-info': icon })

    // Render component
    return (
      <div className={clsName}>
        <SelectBoxValue {...data} />
        {open && <Menu {...data} />}
      </div>
    )
  }

  /**
   * Render Downshift component with our wrappers.
   *
   * @returns {React.Element}
   */
  render () {
    const {
      icon, multi, placeholder, value, options, onChange,
      buildItemId, renderItem, renderValue, renderTag,
      ...passedProps
    } = this.props

    return (
      <Downshift
        stateReducer={this.stateReducer.bind(this)}
        onChange={this.select.bind(this)}
        selectedItem={null}
        {...passedProps}
      >
        {this.renderComponent.bind(this)}
      </Downshift>
    )
  }
}

SelectBox.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** List of options to show */
  options: PropTypes.array.isRequired,

  /** Placeholder to show when there is no value selected */
  placeholder: PropTypes.node,

  /** Is it multi-select? */
  multi: PropTypes.bool,

  /** Event called after current value of select-box has been changed */
  onChange: PropTypes.func,

  /** Function to render item */
  renderItem: PropTypes.func,

  /** Function to render value, otherwise will use same as item */
  renderValue: PropTypes.func,

  /** Function to build item ID - used for 'key' properties */
  buildItemId: PropTypes.func,

  /** Function passed to Downshift to make it working for objects */
  itemToString: PropTypes.func
}

SelectBox.defaultProps = {
  options: [],
  multi: false,
  placeholder: '...',
  renderItem: item => item,
  buildItemId: (item, index) => index,
  itemToString: item => item
}

export default SelectBox
