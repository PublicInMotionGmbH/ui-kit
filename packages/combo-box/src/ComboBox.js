import React from 'react'
import PropTypes from 'prop-types'

import Downshift from 'downshift'

import { buildClassName } from '@talixo/shared'

import Menu from './Menu'
import ComboBoxMultiValue from './ComboBoxMultiValue'
import ComboBoxValue from './ComboBoxValue'

const moduleName = 'combo-box'

const SPACE_KEY = 32
const BACKSPACE_KEY = 8
const TAB_KEY = 9
const COMMA_KEY = 188

/**
 * Function checks whether the object is empty
 *
 * @param {*} obj
 *
 * @returns {bool}
 */
function isEmpty (obj) {
  for (const item in obj) {
    return false
  }
  return true
}

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** List of options to show */
  options: PropTypes.array.isRequired,

  /** Placeholder to show when there is no value selected */
  placeholder: PropTypes.node,

  /** Is it multi-select? */
  multi: PropTypes.bool,

  /** Event called after current value of combo-box has been changed */
  onChange: PropTypes.func,

  /** Event called when combo-box is focused */
  onFocus: PropTypes.func,

  /** Event called when combo-box has lost focus */
  onBlur: PropTypes.func,

  /** Event called after input value has been changed */
  onInputValueChange: PropTypes.func,

  /** Event called after unknown value is requested to be added */
  onNewValue: PropTypes.func,

  /** Function to render item */
  renderItem: PropTypes.func,

  /** Function to render value, otherwise will use same as item */
  renderValue: PropTypes.func,

  /** Function to build item ID - used for 'key' properties */
  buildItemId: PropTypes.func,

  /** Function passed to Downshift to make it working for objects */
  itemToString: PropTypes.func,

  /** Value for input if you want to control it by yourself */
  inputValue: PropTypes.string,

  /** Value for controlled component */
  value: PropTypes.any,

  /** ID passed to control element */
  id: PropTypes.string,

  /** Should it be disabled? */
  disabled: PropTypes.bool,

  /** Should it be read-only? */
  readOnly: PropTypes.bool
}

const defaultProps = {
  options: [],
  multi: false,
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
 * @property {boolean} [props.disabled]
 * @property {boolean} [props.readOnly]
 *
 * @class
 */
class ComboBox extends React.PureComponent {
  state = {
    value: this.props.value,
    inputValue: this.props.inputValue || ''
  }

  /**
   * Update input value if it's provided from outside.
   *
   * @param {object} props
   * @param {object} state
   * @param {string} [props.inputValue]
   *
   * @returns {object || null}
   */
  static getDerivedStateFromProps (props, state) {
    const composedState = {}

    if (props.inputValue != null && state.inputValue !== props.inputValue) {
      composedState['inputValue'] = props.inputValue
    }

    if (props.value !== state.value && props.value !== undefined) {
      composedState['value'] = props.value
    }
    return isEmpty(composedState) ? null : composedState
  }

  /**
   * Check if this input is disabled.
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
   * Reduce state change of Downshift.
   * This function handles side effects of reducing state.
   *
   * @param {object} state
   * @param {object} changes
   * @returns {object}
   */
  stateReducer = (state, changes) => {
    const nextState = this._stateReducer(state, changes)

    if (this.props.inputValue == null && nextState.inputValue !== undefined) {
      const nextInputValue = nextState.inputValue == null ? '' : nextState.inputValue

      if (nextInputValue !== this.state.inputValue) {
        this.setState({ inputValue: nextInputValue })
      }
    }

    return nextState
  }

  /**
   * Handle state changes inside of Downshift component.
   * We need it to not close menu after element is clicked in multi-select.
   *
   * @param {object} state
   * @param {object} changes
   * @returns {object}
   */
  _stateReducer (state, changes) {
    const { multi } = this.props

    switch (changes.type) {
      case Downshift.stateChangeTypes.clickItem:
      case Downshift.stateChangeTypes.keyDownEnter:
        // Remove input value when item has been selected,
        // And keep list open if it's multi-select
        const nextChanges = {
          ...changes,
          inputValue: '',
          isOpen: multi
        }

        // Keep selected item still highlighted, when it's multi-select
        if (multi && this.state.inputValue === '') {
          nextChanges.highlightedIndex = state.highlightedIndex
        }

        return nextChanges
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
    const {
      footer, icon, options, multi, placeholder,
      buildItemId, renderItem, renderValue, onFocus, onBlur
    } = this.props
    const { value } = this.state

    return {
      ...data,
      ...{ footer, icon, options, multi, placeholder, buildItemId, renderItem },
      inputValue: this.state.inputValue,
      renderValue: renderValue || renderItem,
      getInputProps: props => data.getInputProps(this.getInputProps(props)),
      getRemoveButtonProps: this.getRemoveButtonProps,
      getClearButtonProps: this.getClearButtonProps,
      selectedItems: value == null ? [] : [].concat(value),
      onInputFocus: onFocus,
      onInputBlur: onBlur
    }
  }

  /**
   * Build props for 'remove' button.
   *
   * @param {object} props
   * @returns {object|{ onClick: function }}
   */
  getRemoveButtonProps = (props) => {
    const { onClick, item } = props || {}

    return {
      ...props,
      onClick: event => {
        // Do not propagate click on 'remove' button - it may cause strange operations on Downshift
        event.stopPropagation()

        // Select again (= unselect) current element
        this.select(item)

        if (onClick) {
          onClick(event)
        }
      }
    }
  }

  /**
   * Build props for 'clear' button.
   *
   * @param {object} props
   * @returns {object|{ onClick: function }}
   */
  getClearButtonProps = (props) => {
    const onClick = props ? props.onClick : null

    return {
      ...props,
      onClick: event => {
        // Do not propagate click on 'clear' button - it may cause strange operations on Downshift
        event.stopPropagation()

        // Unselect current element
        this.select(null)

        if (onClick) {
          onClick(event)
        }
      }
    }
  }

  /**
   * Build props for input, to handle keyboard events.
   *
   * @param {object} props
   * @returns {object|{ onClick: function }}
   */
  getInputProps (props) {
    const { onFocus, onBlur, id } = this.props
    const onKeyDown = props ? props.onKeyDown : null

    return {
      ...props,
      onFocus,
      onBlur,
      id,
      disabled: this.isDisabled(),
      onKeyDown: event => {
        this.handleInputKeyDown(event)

        if (onKeyDown) {
          onKeyDown(event)
        }
      }
    }
  }

  /**
   * Handle keyboard events on input.
   *
   * @param {SyntheticEvent|Event} event
   */
  handleInputKeyDown (event) {
    const { inputValue, value } = this.state
    const { multi, onNewValue } = this.props

    // Don't handle it when it's disabled
    if (this.isDisabled()) {
      return
    }

    // Do not propagate space in input, as it will cause removing value
    if (event.which === SPACE_KEY) {
      event.stopPropagation()
      return
    }

    // Rest of handlers is for multi-select combo-boxes only
    if (!multi) {
      return
    }

    // Remove last value in multi-select on backspace
    if (event.which === BACKSPACE_KEY && inputValue === '' && value.length) {
      event.stopPropagation()

      // Unselect last value
      this.select(value[value.length - 1])
    }

    // Handle adding new value
    if ((event.which === COMMA_KEY || event.which === TAB_KEY) && inputValue !== '') {
      event.preventDefault()
      event.stopPropagation()

      this.setState({ inputValue: '' })

      if (this.props.value === undefined) {
        this.setState({ value: (value || []).concat(inputValue) })
      }

      if (onNewValue) {
        onNewValue(inputValue)
      }
    }
  }

  /**
   * Handle item (un)selection.
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

    // Build value component
    const value = multi ? <ComboBoxMultiValue {...data} /> : <ComboBoxValue {...data} />

    // Build menu component
    const menu = open ? <Menu {...data} /> : null

    // Render component
    return (
      <div className={clsName}>
        {value}
        {menu}
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
      icon, multi, placeholder, value, options, onChange, readOnly, disabled,
      buildItemId, renderItem, renderValue, children, ...passedProps
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
}

ComboBox.displayName = 'ComboBox'

ComboBox.propTypes = propTypes
ComboBox.defaultProps = defaultProps

export default ComboBox
