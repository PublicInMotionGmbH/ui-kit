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

  /** Should it be read-only? */
  readOnly: PropTypes.bool,

  /** Rendered value for empty input value. */
  emptyValue: PropTypes.string,

  /** Indicates that input has error. */
  error: PropTypes.bool,

  /** Right side input icon or controls. */
  icon: PropTypes.node,

  /** Callback for change event. */
  onChange: PropTypes.func,

  /** Input placeholder. */
  placeholder: PropTypes.string.isRequired,

  /** Input value. */
  value: PropTypes.string,

  /** ID passed to control element */
  id: PropTypes.string
}

const defaultProps = {
  disabled: false,
  readOnly: false,
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
 * @property {boolean} [props.readOnly]
 * @property {boolean} [props.error]
 * @property {string} [props.emptyValue]
 * @property {node} [props.icon]
 * @property {function} [props.onChange]
 * @property {string} [props.placeholder]
 * @property {string} [props.value]
 * @property {boolean} [props.disabled]
 * @property {boolean} [props.readOnly]
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

  componentWillReceiveProps (props) {
    if (props.value != null && props.value !== this.state.inputValue) {
      this.setState({ inputValue: props.value })
    }
  }

  /**
   * Focus input when component is updated.
   */
  componentDidUpdate (prevProps, prevState) {
    const editable = this._input !== undefined && prevState.editing !== this.state.editing && !prevState.editing

    if (editable) { this.focusInput(this._input) }
  }

  /**
   * Focus input and set selection.
   *
   * @param {node} input
   *
   */
  focusInput (input) {
    const { selected, selection: { start, end } } = this.state

    if (selected) {
      if (start <= end) {
        input.setSelectionRange(start, end)
      } else {
        input.setSelectionRange(end, start, 'backwards')
      }
    }

    input.focus()
  }

  /**
   * Handle input blur.
   *
   */
  handleBlur = () => {
    this.setState({ editing: false })
  }

  /**
   * Handle input change.
   *
   * @param {string} inputValue
   *
   */
  handleInputChange = (inputValue) => {
    const { onChange } = this.props

    this.setState({ inputValue })

    // Trigger input change to parent components
    if (onChange) { onChange(inputValue) }
  }

  /**
   * Handle key press.
   *
   * @param {SyntheticEvent} e
   *
   */
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.setState({ editing: false })
    }
  }

  /**
   * Handle span click.
   *
   * @param {SyntheticEvent} e
   *
   */
  handleSpanClick = () => {
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

  /**
   * Set ref.
   *
   * @param {HTMLElement|null} node
   *
   */
  setRef = (node) => {
    this._input = node
  }

  /**
   * Render inline input
   *
   * @returns {React.Element}
   */
  render () {
    const { className, disabled, readOnly, emptyValue, error, icon, onChange, placeholder, value, id, ...passedProps } = this.props
    const { editing, inputValue } = this.state
    const { setRef, handleBlur, handleInputChange, handleKeyPress, handleSpanClick } = this

    // Build placeholder and span values
    const spanPlaceholder = emptyValue == null ? placeholder : emptyValue
    const spanValue = inputValue === '' ? spanPlaceholder : inputValue

    // Build class names
    const wrapperClsName = buildClassName(moduleName, className, { disabled, 'read-only': readOnly })
    const inputClsName = buildClassName([moduleName, 'input'])
    const spanClsName = buildClassName([moduleName, 'span'], null, { disabled, 'read-only': readOnly, error })

    // Build inline input component
    return (
      <div className={wrapperClsName} {...passedProps}>
        {editing && !disabled
          ? <TextInput
            id={id}
            readOnly={readOnly}
            className={inputClsName}
            error={error}
            inputRef={setRef}
            placeholder={placeholder || inputValue}
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
            right={icon}
            type='text'
          />
          : <button
            id={!editing || disabled ? id : null}
            className={spanClsName}
            onClick={handleSpanClick}
          >
            {spanValue}
          </button>
        }
      </div>
    )
  }
}

InlineInput.propTypes = propTypes

InlineInput.defaultProps = defaultProps

export default InlineInput
