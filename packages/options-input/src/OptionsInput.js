import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@talixo/icon'
import { buildClassName } from '@talixo/shared'

import ListOption from './ListOption'
import Option from './Option'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Data for generate ListOption */
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

  /** Value of option */
  value: PropTypes.object
}

const defaultProps = {
  options: []
}

/**
 * * Component which represents OptionsInput.
 *
 * @property {*} props
 * @property {string} [props.className]
 * @property {array} [props.options]
 * @property {string} [props.options.id]
 * @property {string} [props.options.icon]
 * @property {string} [props.options.label]
 * @property {number} [props.options.default]
 * @property {number} [props.options.min]
 * @property {number} [props.options.max]
 *
 * @class {React.Element}
 */
class OptionsInput extends React.PureComponent {
  state = {
    open: false,
    value: this.buildValue(this.props.options, this.props.value)
  }

  /**
   * This function set state value
   *
   * @param {object} nextProps
   */
  componentWillReceiveProps (nextProps) {
    let value = this.state.value

    if (this.state.value !== nextProps.value && nextProps.value !== undefined) {
      value = this.buildValue(nextProps.options, nextProps.value)
    }

    if (this.props.options !== nextProps.options) {
      value = this.buildValue(nextProps.options, value)
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
   * This function set value of value
   *
   * @param {array} options
   * @param {number} baseValue
   *
   * @returns {number}
   */
  buildValue (options, baseValue) {
    const currentValue = baseValue || {}

    const value = {}

    for (let i = 0; i < options.length; i++) {
      const option = options[i]
      value[option.id] = currentValue[option.id] || option.default || 0
    }

    return value
  }

  /**
   * This function set state.open
   */
  toggle () {
    const nextOpen = !this.state.open

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
   * This function set state.value
   * @param {string} id
   * @param {number} value
   */
  change = (id, value) => {
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
   * This function handle focus
   */
  focus = () => {
    this.toggle()

    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }

  /**
   * This function handle blur
   */
  blur = () => {
    if (this.props.onBlur) {
      this.props.onBlur()
    }
  }

  render () {
    const { options, className, ...restProps } = this.props
    const { value } = this.state
    const elements = options.filter(x => value[x.id]).map(x => (
      <Option
        key={x.id}
        option={x}
        value={value[x.id]}
      />
    ))

    const listElements = options.map(x => (
      <ListOption
        key={x.id}
        option={x}
        value={value[x.id]}
        onChange={this.change}
      />
    ))

    const clsName = buildClassName('options-input', className, {
      'open': this.state.open
    })

    return (
      <div className={clsName} ref={this.saveRef} {...restProps} >
        <button
          type='button'
          className='options-input__toggle'
          onFocus={this.focus}
          onBlur={this.blur}
          aria-expanded={this.state.open}
          role='button'
        >
          <div className='options-input__value'>
            {elements}
          </div>

          <Icon name={this.state.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
        </button>
        <div className='options-input__list' aria-hidden={!this.state.open}>
          {listElements}
        </div>
      </div>
    )
  }
}

OptionsInput.propTypes = propTypes
OptionsInput.defaultProps = defaultProps

export default OptionsInput
