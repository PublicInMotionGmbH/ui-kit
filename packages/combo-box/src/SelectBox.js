import React from 'react'
import PropTypes from 'prop-types'

import Downshift from 'downshift'

import { buildClassName } from '@talixo/shared'
import { DeviceSwap } from '@talixo/device-swap'

import NativeSelect from './NativeSelect'
import Menu from './Menu'
import SelectBoxValue from './SelectBoxValue'

const moduleName = 'combo-box'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Icon to show on right of select-box */
  icon: PropTypes.node,

  /** List of options to show */
  options: PropTypes.array.isRequired,

  /** Placeholder to show when there is no value selected */
  placeholder: PropTypes.node,

  /** Is it multi-select? */
  multi: PropTypes.bool,

  /** Value for controlled component */
  value: PropTypes.any,

  /** Event called after current value of select-box has been changed */
  onChange: PropTypes.func,

  /** Event called when combo-box is focused */
  onFocus: PropTypes.func,

  /** Event called when combo-box has lost focus */
  onBlur: PropTypes.func,

  /** Function to render item */
  renderItem: PropTypes.func,

  /** Function to render value, otherwise will use same as item */
  renderValue: PropTypes.func,

  /** Function to build item ID - used for 'key' properties */
  buildItemId: PropTypes.func,

  /** Function passed to Downshift to make it working for objects */
  itemToString: PropTypes.func,

  /** ID passed to control element */
  id: PropTypes.string,

  /** Tab index for toggle button */
  tabIndex: PropTypes.number,

  /** Should it act almost-like native "select" on mobile devices? */
  mobileFriendly: PropTypes.bool,

  /** Should it be disabled? */
  disabled: PropTypes.bool,

  /** Should it be read-only? */
  readOnly: PropTypes.bool
}

const defaultProps = {
  options: [],
  multi: false,
  mobileFriendly: false,
  disabled: false,
  readOnly: false,
  placeholder: '...',
  renderItem: item => item,
  buildItemId: (item, index) => index,
  itemToString: item => item
}

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
  state = {
    value: this.props.value
  }

  /**
   * Update state when new props came
   *
   * @param {object} props
   * @param {object} state
   *
   * @returns {object || null}
   */
  static getDerivedStateFromProps (props, state) {
    if (props.value !== state.value && props.value !== undefined) {
      return { value: props.value }
    } else return null
  }

  /**
   * Handle state changes inside of Downshift component.
   * We need it to not close menu after element is clicked in multi-select.
   *
   * @param {object} state
   * @param {object} changes
   * @returns {object}
   */
  stateReducer = (state, changes) => {
    const { multi } = this.props

    if (changes.type === Downshift.stateChangeTypes.clickItem) {
      changes = {
        ...changes,
        isOpen: multi
      }
    }

    if ('isOpen' in changes) {
      if (changes.isOpen && this.props.onFocus) {
        this.props.onFocus()
      } else if (!changes.isOpen && this.props.onBlur) {
        this.props.onBlur()
      }
    }

    return changes
  }

  /**
   * Check if component is disabled.
   *
   * @param {object} [props]
   * @param {boolean} [props.disabled]
   * @param {boolean} [props.readOnly]
   * @returns {boolean}
   */
  isDisabled (props) {
    const { disabled, readOnly } = props || this.props

    return disabled || readOnly
  }

  /**
   * Get props which should be passed through our components below Downshift.
   *
   * @param {object} data
   * @returns {object}
   */
  getStateProps (data) {
    const { footer, icon, options, multi, tabIndex, placeholder, buildItemId, renderItem, renderValue, id } = this.props
    const { value } = this.state

    return {
      ...data,
      ...{ footer, icon, options, multi, tabIndex, placeholder, buildItemId, renderItem, id },
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
  getRemoveButtonProps = (props) => {
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
  select = (item) => {
    const { onChange, multi } = this.props
    const { value } = this.state

    // Don't handle it when it's disabled
    if (this.isDisabled()) {
      return
    }

    // Handle simple selection for single select-box
    if (!multi) {
      if (this.props.value === undefined) {
        this.setState({ value: item })
      }

      if (onChange) {
        onChange(item)
      }

      return
    }

    // Build array of current values
    const _value = value == null ? [] : [].concat(value)

    // Remove existing or add new item to value
    const nextValue = _value.indexOf(item) !== -1
      ? _value.filter(x => x !== item)
      : _value.concat(item)

    if (this.props.value === undefined) {
      this.setState({ value: nextValue })
    }

    // Trigger event with new value
    if (onChange) {
      onChange(nextValue)
    }
  }

  /**
   * Select from native <select> element.
   *
   * @param {Event|SyntheticEvent} event
   */
  selectNative = (event) => {
    const { onChange, multi, options } = this.props

    // Don't handle it when it's disabled
    if (this.isDisabled()) {
      return
    }

    const element = event.target
    const selectedItems = []

    for (const option of element.options) {
      if (option.selected) {
        selectedItems.push(options[option.value])
      }
    }

    if (!multi) {
      const value = selectedItems.length > 0 ? selectedItems[0] : null

      if (this.props.value === undefined) {
        this.setState({ value })
      }

      if (onChange) {
        onChange(value)
      }

      return
    }

    if (this.props.value === undefined) {
      this.setState({ value: selectedItems })
    }

    // Trigger event with new value
    if (onChange) {
      onChange(selectedItems)
    }
  }

  /**
   * Render component in Downshift flow
   *
   * @param {object} _data
   * @returns {React.Element}
   */
  renderComponent = (_data) => {
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
      <div
        className={clsName}
        onMouseOver={this.props.onMouseOver}
        onMouseLeave={this.props.onMouseLeave}
        onMouseEnter={this.props.onMouseEnter}
      >
        <SelectBoxValue {...data} />
        {open && <Menu {...data} />}
      </div>
    )
  }

  /**
   * Choose which component should be rendered.
   *
   * @returns {React.Element}
   */
  renderMobileFriendly () {
    return (
      <DeviceSwap
        defaultView='mobile'
        renderMobile={this.renderSimple}
        renderDesktop={this.renderFullyFeatured}
      />
    )
  }

  /**
   * Render simpler select box, which will not style menu/options.
   *
   * @returns {React.Element}
   */
  renderSimple = () => {
    const { className, multi, icon, options, id, renderItem, disabled, readOnly } = this.props
    const { value } = this.state

    const elements = options.map((option, index) => (
      <option key={index} value={option}>{renderItem(option)}</option>
    ))

    // Build class name for wrapper
    const clsName = buildClassName(
      moduleName,
      className,
      [ 'simple-select' ],
      { multi, 'with-info': icon }
    )

    const selectClsName = buildClassName([ moduleName, 'select' ])

    const valueProps = {
      ...this.getStateProps({}),
      getToggleButtonProps: () => ({})
    }

    const select = (
      <NativeSelect
        id={id}
        disabled={disabled}
        readOnly={readOnly}
        multiple={multi}
        value={multi ? value == null ? [] : Array.isArray(value) ? value : [].concat(value) : value}
        className={selectClsName}
        onChange={this.selectNative}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      >
        {elements}
      </NativeSelect>
    )

    // Render component
    return (
      <div
        className={clsName}
        onMouseOver={this.props.onMouseOver}
        onMouseLeave={this.props.onMouseLeave}
        onMouseEnter={this.props.onMouseEnter}
      >
        <SelectBoxValue {...valueProps} />
        {select}
      </div>
    )
  }

  renderFullyFeatured = () => {
    const {
      icon, multi, placeholder, value, tabIndex, options, onChange, onFocus, onBlur, onMouseOver, onMouseLeave,
      onMouseEnter, buildItemId, renderItem, renderValue, disabled, readOnly, ...passedProps
    } = this.props

    return (
      <Downshift
        stateReducer={this.stateReducer}
        onChange={this.select}
        selectedItem={null}
        disabled={this.isDisabled()}
        {...passedProps}
      >
        {this.renderComponent}
      </Downshift>
    )
  }

  /**
   * Render Downshift component with our wrappers.
   *
   * @returns {React.Element}
   */
  render () {
    const { mobileFriendly } = this.props

    // Assuming, that we can render simple select box without any problems,
    // as by default it's only showing a string in options.
    if (mobileFriendly) {
      return this.renderMobileFriendly()
    }

    return this.renderFullyFeatured()
  }
}

SelectBox.displayName = 'SelectBox'

SelectBox.propTypes = propTypes
SelectBox.defaultProps = defaultProps

export default SelectBox
