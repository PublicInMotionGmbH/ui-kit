import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { Icon } from '@talixo/icon'

import OptionsInputList from './OptionsInputList'
import OptionsInputValue from './OptionsInputValue'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Options to show */
  options: PropTypes.arrayOf(PropTypes.shape({
    /** Id for option */
    id: PropTypes.string.isRequired,

    /** Type of icon */
    icon: PropTypes.string,

    /** Label for option */
    label: PropTypes.string,

    /** Default value */
    default: PropTypes.number,

    /** Minimum value within the range */
    min: PropTypes.number,

    /** Maximum value within the range */
    max: PropTypes.number
  })),

  /** Array of options IDs which will be displayed event if their value is 0. */
  persistentOptions: PropTypes.arrayOf(PropTypes.string),

  /** Input value */
  value: PropTypes.object,

  /** Event handler fired on change of value */
  onChange: PropTypes.func,

  /** Event handler fired on focus */
  onFocus: PropTypes.func,

  /** Event handler fired on blur */
  onBlur: PropTypes.func,

  /** ID passed to control element */
  id: PropTypes.string,

  /** Does it have error */
  error: PropTypes.bool,

  /** Should it be disabled? */
  disabled: PropTypes.bool,

  /** Should it be read-only? */
  readOnly: PropTypes.bool
}

const defaultProps = {
  options: [],
  persistentOptions: [],
  error: false,
  disabled: false,
  readOnly: false
}

export const moduleName = 'options-input'

/**
 * Build value according to options list and sent value.
 *
 * @param {object[]} options
 * @param {object} baseValue
 *
 * @returns {number}
 */
function buildValue (options, baseValue) {
  const currentValue = baseValue || {}

  const value = {}

  for (let i = 0; i < options.length; i++) {
    const option = options[i]
    value[option.id] = (currentValue[option.id] == null ? option.default : currentValue[option.id]) || 0
  }

  return value
}

/**
 * * Component which represents input where you can select some numeric options.
 *
 * @property {*} props
 * @property {string} [props.className]
 * @property {object} [props.value]
 * @property {object[]|Array<{ id: string, [icon]: string, [label]: string, [default]: number, [min]: number, [max]: number}>} [props.options]
 */
class OptionsInput extends React.PureComponent {
  state = {
    open: false,
    value: buildValue(this.props.options, this.props.value)
  }

  /**
   * Update value according to provided value and options.
   *
   * @param {object} nextProps
   */
  componentWillReceiveProps (nextProps) {
    let value = this.state.value

    if (this.state.value !== nextProps.value && nextProps.value !== undefined) {
      value = buildValue(nextProps.options, nextProps.value)
    }

    if (this.props.options !== nextProps.options) {
      value = buildValue(nextProps.options, value)
    }

    if (value !== this.state.value) {
      this.setState({ value })
    }
  }

  /**
   * This function detach events
   */
  componentWillUnmount () {
    this.detachCloseEvents()
  }

  /**
   * This function set state.open
   */
  toggle (state) {
    const nextOpen = state == null ? !this.state.open : !!state

    this.setState({ open: nextOpen })

    if (nextOpen) {
      this.attachCloseEvents()
    } else {
      this.detachCloseEvents()
    }
  }

  /**
   * This function set state.open
   */
  close () {
    this.setState({ open: false })
  }

  /**
   * This function add events listeners
   */
  attachCloseEvents () {
    document.body.addEventListener('click', this.handleCloseEvent, true)
    document.body.addEventListener('focus', this.handleCloseEvent, true)
  }

  /**
   * This function remove events listeners
   */
  detachCloseEvents () {
    document.body.removeEventListener('click', this.handleCloseEvent)
    document.body.removeEventListener('focus', this.handleCloseEvent)
  }

  /**
   * This function handle events
   */
  handleCloseEvent = (event) => {
    if (!this.el) {
      return
    }
    const body = event.currentTarget

    let element = event.target

    while (element !== body) {
      if (element === this.el) return

      element = element.parentNode
    }

    this.detachCloseEvents()
    this.close()
  }

  /**
   * Update value.
   *
   * @param {string} id
   * @param {number} value
   */
  change = (id, value) => {
    const { disabled, readOnly } = this.props

    if (disabled || readOnly) {
      return
    }

    const nextValue = {
      ...this.state.value,
      [id]: value
    }

    if (this.props.value === undefined) {
      this.setState({ value: nextValue })
    }

    if (this.props.onChange) {
      this.props.onChange(nextValue)
    }
  }

  saveRef = (node) => {
    this.el = node
  }

  /**
   * Handle focusing element.
   */
  focus = () => {
    this.toggle(true)

    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }

  /**
   * Handle losing focus on element.
   */
  blur = () => {
    if (this.props.onBlur) {
      this.props.onBlur()
    }
  }

  click = (...args) => {
    this.focus(true)

    if (this.props.onClick) {
      this.props.onClick(...args)
    }
  }

  render () {
    const {
      options, className, persistentOptions, onClick, onChange, onFocus, onBlur,
      id, error, disabled, readOnly, value: _value, ...restProps
    } = this.props
    const { value, open } = this.state

    const clsName = buildClassName(moduleName, className, { open, error, disabled, 'read-only': readOnly })

    return (
      <div className={clsName} ref={this.saveRef} {...restProps}>
        <button
          id={id}
          type='button'
          className={buildClassName([ moduleName, 'toggle' ])}
          onFocus={this.focus}
          onClick={this.click}
          onBlur={this.blur}
          aria-expanded={open}
          role='button'
        >
          <OptionsInputValue
            options={options}
            persistentOptions={persistentOptions}
            value={value}
          />

          <Icon name={open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
        </button>
        <OptionsInputList
          options={options}
          value={value}
          onChange={this.change}
          disabled={disabled}
          readOnly={readOnly}
        />
      </div>
    )
  }
}

OptionsInput.propTypes = propTypes
OptionsInput.defaultProps = defaultProps

export default OptionsInput
