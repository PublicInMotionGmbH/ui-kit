import React from 'react'
import PropTypes from 'prop-types'

import { prefix } from '@talixo/shared'

import { Icon } from '@talixo/icon'

const moduleName = 'number-input-stepper'

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
    const { initialTime } = this.props

    // Set up timeout which will start automated behavior
    this.timeout = setTimeout(() => this.tick(method), initialTime)

    // Listen for unpressed button to stop automated behavior then
    document.body.addEventListener('mouseup', this.stop)
    document.body.addEventListener('click', this.stop)

    if (this.el) {
      this.el.addEventListener('mouseup', this.stop)
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
        className={buttonClsName}
        onMouseDown={() => this.callAction(action)}
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
    const clsName = prefix(moduleName)

    return (
      <div className={clsName} ref={this.containerRef}>
        {this.buildButton('add', 'onIncrement')}
        {this.buildButton('remove', 'onDecrement')}
      </div>
    )
  }
}

NumberInputStepper.propTypes = {
  /** Event fired when increment is requested */
  onIncrement: PropTypes.func,

  /** Event fired when decrement is requested */
  onDecrement: PropTypes.func,

  /** Time in ms, in which we start automatically increasing on pressed button */
  initialTime: PropTypes.number,

  /** Time in ms, in which we make another tick when pressing a button */
  stepTime: PropTypes.number
}

NumberInputStepper.defaultProps = {
  initialTime: 700,
  stepTime: 20
}

export default NumberInputStepper
