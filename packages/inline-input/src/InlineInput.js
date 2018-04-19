import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'inline-input'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Prevents editing the content. */
  disabled: PropTypes.bool,

  /** Input value */
  value: PropTypes.string
}

const defaultProps = {
  disabled: false,
  value: ''
}

/**
 * Component which represents Inline Input.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {boolean} [props.disabled]
 * @property {string} [props.value]
 * @class
 */
class InlineInput extends React.Component {
  state = {
    editing: false,
    inputValue: this.props.value
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.editing !== this.state.editing && !prevState.editing && !this.props.disabled) {
      this._input.focus()
    }
  }

  handleInputChange = (e) => {
    const inputValue = e.target.value
    this.setState({ inputValue })
  }

  handleSpanClick = () => {
    this.setState({ editing: true })
  }

  handleBlur = () => {
    this.setState({ editing: false })
  }

  render () {
    const { className, disabled, value, ...passedProps } = this.props
    const { editing, inputValue } = this.state

    const wrapperClsName = buildClassName(moduleName, className, { disabled })
    const inputClsName = buildClassName([moduleName, 'input'])
    const spanClsName = buildClassName([moduleName, 'span'], null, { disabled })

    return (
      <div className={wrapperClsName} {...passedProps}>
        {editing && !disabled
          ? <input
            className={inputClsName}
            ref={node => { this._input = node }}
            placeholder={inputValue}
            onChange={(e) => this.handleInputChange(e)}
            onBlur={this.handleBlur}
            type='text'
          />
          : <span
            className={spanClsName}
            onClick={this.handleSpanClick}
          >
            {inputValue}
          </span>
        }
      </div>
    )
  }
}

InlineInput.propTypes = propTypes

InlineInput.defaultProps = defaultProps

export default InlineInput
