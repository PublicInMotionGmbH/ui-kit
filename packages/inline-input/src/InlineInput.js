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

  /** Input value */
  value: PropTypes.string
}

const defaultProps = {
  disabled: false,
  value: ''
}

// Default selection object
const defaultSelection = {
  start: null,
  end: null
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
    inputValue: this.props.value,
    selected: false,
    selection: defaultSelection,
    value: this.props.value
  }

  componentDidUpdate (prevProps, prevState) {
    if (this._input !== undefined && prevState.editing !== this.state.editing && !prevState.editing) {
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

  handleInputChange = (e) => {
    const inputValue = e.target.value
    this.setState({ inputValue })
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
    const { className, disabled, placeholder, value, ...passedProps } = this.props
    const { editing, inputValue } = this.state

    const wrapperClsName = buildClassName(moduleName, className, { disabled })
    const inputClsName = buildClassName([moduleName, 'input'])
    const spanClsName = buildClassName([moduleName, 'span'], null, { disabled })

    return (
      <div className={wrapperClsName} {...passedProps}>
        {editing && !disabled
          ? <TextInput
            className={inputClsName}
            inputRef={node => this.setRef(node)}
            placeholder={placeholder || inputValue}
            value={inputValue}
            onChange={(e) => this.handleInputChange(e)}
            onKeyPress={(e) => this.handleKeyPress(e)}
            onBlur={this.handleBlur}
            type='text'
          />
          : <span
            className={spanClsName}
            onClick={(e) => this.handleSpanClick(e)}
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
