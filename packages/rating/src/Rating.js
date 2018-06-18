import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { Icon } from '@talixo/icon'

const ENTER = 13
const LEFT_ARROW = 37
const UP_ARROW = 38
const RIGHT_ARROW = 39
const DOWN_ARROW = 40
const ARROWS = [ LEFT_ARROW, DOWN_ARROW, UP_ARROW, RIGHT_ARROW ]

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Rating to show, between 0 and 1 */
  value: PropTypes.number,

  /** Number of icons */
  size: PropTypes.number,

  /** Icon name to use */
  icon: PropTypes.string,

  /** Allow changing through keyboard */
  keyboard: PropTypes.bool,

  /** Event to handle user input */
  onChange: PropTypes.func
}

const defaultProps = {
  size: 5,
  value: 0,
  keyboard: true,
  icon: 'star'
}

/**
 * Component which represents Rating.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {string} [props.icon]
 * @property {number} [props.value]
 * @property {number} [props.size]
 * @property {boolean} [props.keyboard]
 * @property {function} [props.onChange]
 *
 * @property {object} state
 * @property {number|null} state.current
 *
 * @class
 */
class Rating extends React.PureComponent {
  state = {
    current: null
  }

  /**
   * Select current value.
   *
   * @param {int} index  icon position
   */
  select (index) {
    const value = (index + 1) / this.props.size

    this.props.onChange(value)
  }

  /**
   * Hover icon to update current value.
   *
   * @param {int} index  icon position
   */
  onHover (index) {
    const value = (index + 1) / this.props.size

    this.setState({
      current: value
    })
  }

  /**
   * Move mouse out of component.
   */
  onOut = () => {
    this.setState({
      current: null
    })
  }

  /**
   * Move focus out of component.
   */
  onBlur = () => {
    const { current } = this.state

    // Unset value
    this.setState({
      current: null
    })

    // Send event with new valuer
    if (current !== null) {
      this.props.onChange(current)
    }
  }

  /**
   * Handle keyboard keys to allow changing rating through arrows.
   *
   * @param {SyntheticEvent} event
   */
  handleKeyboard = (event) => {
    const { size, value } = this.props
    const { current } = this.state

    // Get pressed key code
    const keyCode = event.which

    // Handle Enter button to reset value
    if (keyCode === ENTER) {
      // Ignore when currently there is no value set
      if (current === null) {
        return
      }

      // Uncheck value
      this.setState({
        current: null
      })

      // Trigger change event
      this.props.onChange(current)

      return
    }

    // Ignore when it was different key than arrows
    if (ARROWS.indexOf(keyCode) === -1) {
      return
    }

    // Do not scroll page using arrows
    event.preventDefault()

    // Calculate current offset of icons
    const currentIndex = (current === null ? value : current) * size

    // Calculate index of next offset (after arrow is pressed)
    const nextIndex = keyCode === LEFT_ARROW || keyCode === DOWN_ARROW
      ? Math.max(1, Math.ceil(currentIndex - 1))
      : Math.min(size, Math.floor(currentIndex + 1))

    // Calculate new value
    const nextValue = nextIndex / size

    // Ignore when it's already selected the same
    if (nextValue === current) {
      return
    }

    // Update current state
    this.setState({
      current: nextValue
    })
  }

  /**
   * Render icon element to show inside Rating.
   *
   * @param {number} index  icon position
   * @returns {React.Element}
   */
  renderIcon (index) {
    if (this.props.onChange) {
      return (
        <Icon
          key={index}
          onMouseOver={() => this.onHover(index)}
          onMouseOut={() => this.onOut(index)}
          onMouseLeave={() => this.onOut(index)}
          onClick={() => this.select(index)}
          name={this.props.icon}
        />
      )
    }

    return (
      <Icon key={index} name={this.props.icon} />
    )
  }

  /**
   * Render Rating component.
   *
   * @returns {React.Element}
   */
  render () {
    const { className, size, icon, value, onChange, keyboard, ...passedProps } = this.props
    const { current } = this.state

    // Build icons to show
    const icons = Array.apply(null, new Array(size)).map((x, index) => this.renderIcon(index))

    // Calculate current percentage to view
    const percentage = 100 * (current === null ? value : current)

    // Build class names of Rating
    const clsName = buildClassName('rating', className, {
      hover: current !== null,
      selectable: onChange
    })

    // Build class name of inner component
    const innerClsName = buildClassName([ 'rating', 'inner' ])

    // Build basic properties for rating
    const props = {
      className: clsName,
      role: 'slider',
      'aria-valuemin': '0',
      'aria-valuemax': '100',
      'aria-valuenow': percentage
    }

    // Add properties to handle keyboard events when it's expected
    if (onChange && keyboard) {
      props.tabIndex = '0'
      props.onKeyDown = this.handleKeyboard
      props.onBlur = this.onBlur
    }

    return (
      <span {...props} {...passedProps}>
        {icons}
        <span className={innerClsName} style={{ width: percentage + '%' }}>
          {icons}
        </span>
      </span>
    )
  }
}

Rating.propTypes = propTypes
Rating.defaultProps = defaultProps

export default Rating
