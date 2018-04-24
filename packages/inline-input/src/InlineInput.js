import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { TextInput } from '@talixo/text-input'

export const moduleName = 'inline-input'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Prevents editing the content. */
  disabled: PropTypes.bool,

  /** Rendered value for empty input value. */
  emptyValue: PropTypes.string,

  /** Indicates that input has error. */
  error: PropTypes.bool,

  /** Right side input icon or controls. */
  icon: PropTypes.node,

  /** Callback for change event. */
  onInputChange: PropTypes.func,

  /** Input placeholder. */
  placeholder: PropTypes.string.isRequired,

  /** Input value. */
  value: PropTypes.string
}

const defaultProps = {
  disabled: false,
  error: false,
  value: ''
}

// Default selection object
const defaultSelection = {
  end: null,
  start: null
}

/**
 * Component which represents Inline Input.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {boolean} [props.disabled]
 * @property {boolean} [props.error]
 * @property {string} [props.emptyValue]
 * @property {node} [props.icon]
 * @property {function} [props.onInputChange]
 * @property {string} [props.placeholder]
 * @property {string} [props.value]
 *
 * @property {object} state
 * @property {boolean} state.editing
 * @property {string|null} state.inputValue
 * @property {boolean} state.selected
 * @property {object} state.selection
 *
 * @class
 */
class InlineInput extends React.Component {
  state = {
    editing: false,
    inputValue: this.props.value,
    selected: false,
    selection: defaultSelection
  }

  componentDidUpdate (prevProps, prevState) {
    const editable = this._input !== undefined && prevState.editing !== this.state.editing && !prevState.editing

    if (editable) {
      this.focusInput(this._input)
    }
  }

  focusInput = (obj) => {
    const { selection, selected } = this.state
    const { start, end } = selection

    if (selected) {
      if (start <= end) {
        obj.setSelectionRange(start, end)
      } else {
        obj.setSelectionRange(end, start, 'backwards')
      }
    }
    obj.focus()
  }

  handleBlur = () => {
    this.setState({ editing: false })
  }

  handleInputChange = (inputValue) => {
    const { onInputChange } = this.props

    this.setState({ inputValue })

    // Trigger input change to parent components
    if (onInputChange) {
      onInputChange(inputValue)
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') { this.setState({ editing: false }) }
  }

  handleSpanClick = (e) => {
    const { disabled } = this.props
    let selected, selection
    const editing = !disabled

    if (window.getSelection) {
      selected = true
      const windowSelection = window.getSelection()
      selection = {
        start: windowSelection.anchorOffset,
        end: windowSelection.focusOffset
      }
    } else {
      selected = false
      selection = defaultSelection
    }

    this.setState({ editing, selected, selection })
  }

  setRef = (node) => {
    this._input = node
  }

  render () {
    const { className, disabled, emptyValue, error, icon, placeholder, value, ...passedProps } = this.props
    const { editing, inputValue } = this.state

    const spanValue = inputValue === ''
      ? emptyValue !== undefined
        ? emptyValue
        : placeholder
      : inputValue

    const wrapperClsName = buildClassName(moduleName, className, { disabled })
    const inputClsName = buildClassName([moduleName, 'input'])
    const spanClsName = buildClassName([moduleName, 'span'], null, { disabled, error })

    return (
      <div className={wrapperClsName} {...passedProps}>
        {editing && !disabled
          ? <TextInput
            className={inputClsName}
            error={error}
            inputRef={node => this.setRef(node)}
            placeholder={placeholder || inputValue}
            value={inputValue}
            onChange={(value) => this.handleInputChange(value)}
            onKeyPress={(e) => this.handleKeyPress(e)}
            onBlur={this.handleBlur}
            right={icon}
            type='text'
          />
          : <span
            className={spanClsName}
            onClick={(e) => this.handleSpanClick(e)}
          >
            {spanValue}
          </span>
        }
      </div>
    )
  }
}

InlineInput.propTypes = propTypes

InlineInput.defaultProps = defaultProps

export default InlineInput
