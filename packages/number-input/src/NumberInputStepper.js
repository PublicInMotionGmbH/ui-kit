import React from 'react'
import PropTypes from 'prop-types'

import { prefix, buildClassName } from '@talixo/shared'

import { Icon } from '@talixo/icon'

export const moduleName = 'number-input-stepper'

const SPACE_KEY = 32

const propTypes = {
  /** Event fired when increment is requested */
  onIncrement: PropTypes.func,

  /** Event fired when decrement is requested */
  onDecrement: PropTypes.func,

  /** Time in ms, in which we start automatically increasing on pressed button */
  initialTime: PropTypes.number,

  /** Time in ms, in which we make another tick when pressing a button */
  stepTime: PropTypes.number,

  /** Should it be disabled? */
  disabled: PropTypes.bool
}

const defaultProps = {
  initialTime: 700,
  stepTime: 20,
  disabled: false
}

/**
 * Component which represents stepper buttons for number input
 *
 * @property {object} props
 * @property {function} [props.onIncrement]
 * @property {function} [props.onDecrement]
 * @property {number} props.initialTime
 * @property {number} props.stepTime
 *
 * @property {HTMLElement} [el]
 * @property {*} [timeout]
 *
 * @class
 */
class NumberInputStepper extends React.PureComponent {
  /**
   * Stop automated behavior when component is unmounted.
   */
  componentWillUnmount () {
    this.stop()
  }

  /**
   * Start watching for automated behavior,
   * After a button was pressed.
   *
   * @param {string} method  name of method out of props (onIncrement or onDecrement)
   */
  start (method) {
    const { initialTime, disabled, readOnly } = this.props

    if (disabled || readOnly) {
      return
    }

    // Set up timeout which will start automated behavior
    this.timeout = setTimeout(() => this.tick(method), initialTime)

    // Listen for unpressed button to stop automated behavior then
    document.body.addEventListener('mouseup', this.stop)
    document.body.addEventListener('click', this.stop)

    if (this.el) {
      this.el.addEventListener('mouseup', this.stop)
      this.el.addEventListener('click', this.stop)
    }
  }

  /**
   * Automatically increment/decrement,
   * used when button is pressed.
   *
   * @param {string} method  name of method out of props (onIncrement or onDecrement)
   */
  tick (method) {
    const { stepTime } = this.props

    // Ignore when there is no handler prepared for that
    if (!this.props[method]) {
      return
    }

    // Call handler
    this.props[method](true)

    // Prepare next tick
    this.timeout = setTimeout(() => this.tick(method), stepTime)
  }

  /**
   * Stop automated behavior.
   */
  stop = () => {
    // Clear current action in queue
    clearTimeout(this.timeout)

    // Stop listening for unpressed button
    document.body.removeEventListener('mouseup', this.stop)
    document.body.removeEventListener('click', this.stop)

    if (this.el) {
      this.el.removeEventListener('mouseup', this.stop)
      this.el.removeEventListener('click', this.stop)
    }
  }

  /**
   * Call increment or decrement action.
   *
   * @param {string} name
   */
  callAction = name => {
    // Start listening for unpressed button
    this.start(name)

    // Call action when it's available
    if (this.props[name]) {
      this.props[name](false)
    }
  }

  /**
   * Call increment or decrement action.
   *
   * @param {string} name
   * @param {Event|SyntheticEvent} event
   */
  callKeyAction = (name, event) => {
    // It should happen only on Spacebar pressed
    if (event.which !== SPACE_KEY) {
      return
    }

    // Call action when it's available
    if (this.props[name]) {
      this.props[name](false)
    }
  }

  /**
   * Save reference to container.
   *
   * @param {HTMLElement} el
   */
  containerRef = el => {
    this.el = el
  }

  /**
   * Build element for stepper button.
   *
   * @param {string} icon
   * @param {string} action
   * @returns {React.Element}
   */
  buildButton (icon, action) {
    const buttonClsName = prefix(moduleName, 'button')

    return (
      <button
        type='button'
        className={buttonClsName}
        onMouseDown={() => this.callAction(action)}
        onKeyDown={event => this.callKeyAction(action, event)}
      >
        <Icon name={icon} />
      </button>
    )
  }

  /**
   * Render stepper component.
   *
   * @returns {React.Element}
   */
  render () {
    const { disabled } = this.props
    const clsName = buildClassName(moduleName, null, { disabled })

    return (
      <div className={clsName} ref={this.containerRef}>
        {this.buildButton('add', 'onIncrement')}
        {this.buildButton('remove', 'onDecrement')}
      </div>
    )
  }
}

NumberInputStepper.propTypes = propTypes

NumberInputStepper.defaultProps = defaultProps

export default NumberInputStepper
