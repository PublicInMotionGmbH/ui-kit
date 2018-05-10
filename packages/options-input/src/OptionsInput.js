import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@talixo/icon'
import { NumberInput } from '@talixo/number-input'
import { Tooltip } from '@talixo/tooltip'
import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Data for generate ListOption */
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    default: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number
  }))
}

const defaultProps = {
  options: []
}

/**
 * * Component which represents Option.
 *
 * @param {*} props
 * @param {array} [props.options]
 * @param {string} [props.options.id]
 * @param {string} [props.options.icon]
 * @param {string} [props.options.label]
 * @param {number} [props.options.default]
 * @param {number} [props.options.min]
 * @param {number} [props.options.max]
 *
 * @returns {React.Element}
 */
function Option (props) {
  const { option, value } = props

  const label = <React.Fragment>
    <h6>{option.label}</h6>
    {option.description ? <p>{option.description}</p> : null}
  </React.Fragment>

  return (
    <span className='options-input__option'>
      <Tooltip render={() => label} position='top'>
        <span><Icon name={option.icon} /></span>
      </Tooltip>
      <span>{value}</span>
    </span>
  )
}

/**
 * * Component which represents ListOption.
 *
 * @param {*} props
 * @param {array} [props.options]
 * @param {string} [props.options.id]
 * @param {string} [props.options.icon]
 * @param {string} [props.options.label]
 * @param {number} [props.options.default]
 * @param {number} [props.options.min]
 * @param {number} [props.options.max]
 *
 * @returns {React.Element}
 */
function ListOption (props) {
  const { option, value, onChange } = props

  const clsName = buildClassName('options-input__list-option', {
    'options-input__list-option--active': value > 0
  })

  const icon = (
    <Icon name={option.icon} />
  )

  const label = (
    <div className='options-input__list-option__label'>
      <span className='options-input__list-option__title'>{option.label}</span>
      <span className='options-input__list-option__description'>{option.description}</span>
    </div>
  )

  return (
    <div className={clsName}>
      <NumberInput
        left={icon}
        suffix={label}
        value={value}
        onChange={value => onChange(option.id, value)}
        min={option.min}
        max={option.max}
      />
    </div>
  )
}

/**
 * * Component which represents OptionsInput.
 *
 * @param {*} props
 * @param {array} [props.options]
 * @param {string} [props.options.id]
 * @param {string} [props.options.icon]
 * @param {string} [props.options.label]
 * @param {number} [props.options.default]
 * @param {number} [props.options.min]
 * @param {number} [props.options.max]
 *
 * @returns {React.Element}
 */
class OptionsInput extends React.PureComponent {
  state = {
    open: false,
    value: this.buildValue(this.props.options, this.props.value)
  }

  /**
   * This function set state value
   *
   * @param {*} nextProps
   */
  componentWillReceiveProps (nextProps) {
    let value = nextProps.value ? { ...nextProps.value } : { ...this.state.value }

    if (this.props.options !== nextProps.options) {
      value = this.buildValue(nextProps.options)
    }

    this.setState({ value })
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
      if (element === this.el) {
        return
      }

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
  change (id, value) {
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

  saveRef (node) {
    this.el = node
  }

  /**
   * This function handle focus
   */
  focus () {
    this.toggle()

    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }

  /**
   * This function handle blur
   */
  blur () {
    if (this.props.onBlur) {
      this.props.onBlur()
    }
  }

  render () {
    const { options, className } = this.props
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
        onChange={this.change.bind(this)}
      />
    ))

    const clsName = buildClassName('options-input', className, {
      'open': this.state.open
    })

    return (
      <div className={clsName} ref={this.saveRef.bind(this)}>
        <button
          type='button'
          className='options-input__toggle'
          onFocus={this.focus.bind(this)}
          onBlur={this.blur.bind(this)}
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
