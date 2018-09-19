import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

import { Button } from '@talixo/button'
import { Icon } from '@talixo/icon'
import { buildClassName } from '@talixo/shared'

import { events, getDataTransferFile, getImageUrl, prevent } from './helpers'

export const moduleName = 'image-input'

const propTypes = {
  /** Additional class name passed to wrapper. */
  className: PropTypes.string,

  /** Upload button label. */
  label: PropTypes.string,

  /** Function which handles image change. Receives URL data, ArrayBuffer, or File object. */
  onChange: PropTypes.func,

  /** onDragEnd callback. */
  onDragEnd: PropTypes.func,

  /** onDragEnter callback. */
  onDragEnter: PropTypes.func,

  /** onDragExit callback. */
  onDragExit: PropTypes.func,

  /** onDragLeave callback. */
  onDragLeave: PropTypes.func,

  /** onDragOver callback. */
  onDragOver: PropTypes.func,

  /** onDragEnd callback. */
  onDragStart: PropTypes.func,

  /** onRemove callback. */
  onRemove: PropTypes.func,

  /** Type of data passed to onChange function: `url`, `binary`, `file`. */
  type: PropTypes.oneOf(['url', 'binary', 'file']),

  /** Image which can be controlled from outside component */
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}

const defaultProps = {
  label: 'Browse files',
  type: 'url'
}

/**
 * Component which represents Image Input.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {string} [props.label]
 * @property {function} [props.onChange]
 * @property {function} [props.onDragEnd]
 * @property {function} [props.onDragEnter]
 * @property {function} [props.onDragExit]
 * @property {function} [props.onDragLeave]
 * @property {function} [props.onDragOver]
 * @property {function} [props.onDragStart]
 * @property {function} [props.onRemove]
 * @property {string} [props.type]
 * @property {object|string} [props.value]
 *
 * @property {object} state
 * @property {boolean} state.draggingOver
 * @property {object|string} state.value
 * @property {string} state.url
 *
 * @class {React.Element}
 */
class ImageInput extends React.Component {
  state = {
    draggingOver: false,
    value: this.props.value || null,
    url: this.props.value ? getImageUrl(this.props.value, this.props.type) : null
  }

  /**
   * Prevents default drop and dragover actions.
   */
  componentDidMount () {
    document.addEventListener('drop', prevent)
    document.addEventListener('dragover', prevent)
  }

  /**
   * Removes preventing default drop and dragover actions.
   */
  componentWillUnmount () {
    document.removeEventListener('drop', prevent)
    document.removeEventListener('dragover', prevent)
  }

  /**
   * Handles changes from props.
   * @param {object} nextProps
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== undefined && nextProps.value !== this.props.value) {
      const newUrl = getImageUrl(nextProps.value, nextProps.type)
      this.setState({ value: nextProps.value, url: newUrl })
    }
  }

  /**
   * Handles button click.
   */
  onClick = () => {
    // Opens file upload dialog.
    this.input.click()
  }

  /**
   * Handles file upload.
   *
   * @param {Event|SyntheticEvent} e
   */
  onChange = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { onChange, value: propsValue, type } = this.props
    const { value, url: stateUrl } = this.state
    const file = getDataTransferFile(e)

    const reader = new window.FileReader()
    reader.onload = this.finishChange

    this.setState({ draggingOver: false })

    // Check if file is the same or not of image type.
    if (!file || !(file.type.indexOf('image') > -1) || file === value) {
      return
    }

    // Handle image upload if type of returned value should be URL.
    if (type === 'url') {
      reader.readAsDataURL(file)
    }

    // Handle image upload if type of returned value should be binary.
    if (type === 'binary') {
      reader.readAsArrayBuffer(file)
    }

    // Handle image upload if type of returned value should be File
    if (onChange && type === 'file') {
      onChange(file)
    }

    // Update state if component is self-controlled
    if (propsValue === undefined) {
      const url = window.URL.createObjectURL(file)
      this.setState({ value: file, url: url }, () => {
        if (stateUrl) {
          window.URL.revokeObjectURL(stateUrl)
        }
      })
    }
  }

  /**
   * Handles invoking onChange function from props after image is loaded.
   *
   * @param {Event|SyntheticEvent} e
   */
  finishChange = (e) => {
    const { onChange } = this.props
    const file = e.target.result

    if (onChange) {
      onChange(file)
    }
  }

  /**
   * Handles image removing
   * @param {object} file
   * @param {Event|SyntheticEvent} e
   */
  onRemove = (e) => {
    const { value: propsValue, onRemove } = this.props
    const { value } = this.state
    e.stopPropagation()

    if (onRemove) {
      onRemove(value, e)
    }

    if (propsValue != null) {
      return
    }

    this.setState({ value: null, url: null })
  }

  /**
   * Handles drag actions.
   *
   * @param {string} type
   * @param {Event|SyntheticEvent} e
   */
  onDrag = (type, e) => {
    e.preventDefault()
    const files = getDataTransferFile(e)

    if (this.props[type]) {
      this.props[type](files, e)
    }

    if (type === events.enter) {
      this.setState({ draggingOver: true })
    }

    if (type === events.start) {
      return
    }

    if (type === events.end || type === events.leave || type === events.exit) {
      this.setState({ draggingOver: false })
    }
  }

  /**
   * Saves ref to file input.
   *
   * @param {Element} node
   */
  setRef = (node) => {
    this.input = findDOMNode(node)
  }

  /**
   * Generates file elements
   *
   * @returns {Element|ReactElement}
   */
  getWrapperProps () {
    const { className } = this.props
    const { draggingOver, value } = this.state
    const { onDrag, onChange } = this

    const wrapperProps = {}

    // Class names
    wrapperProps.className = buildClassName(moduleName, className, {
      dragover: draggingOver,
      'not-empty': value
    })

    for (const event in events) {
      if (events.hasOwnProperty(event)) {
        const currEvent = events[event]
        wrapperProps[currEvent] = onDrag.bind(this, currEvent)
      }
    }
    wrapperProps.onDrop = onChange

    return wrapperProps
  }

  render () {
    const { className, label, onChange: change, type, value: propsValue, onDragEnd,
      onDragEnter, onDragExit, onDragLeave, onDragOver, onDragStart, onRemove, ...passedProps
    } = this.props
    const { value, url } = this.state

    // Class names
    const inputCls = buildClassName([moduleName, 'input'])
    const imageCls = buildClassName([moduleName, 'image'])
    const iconRemoveCls = buildClassName([moduleName, 'remove'])
    const buttonCls = buildClassName([moduleName, 'button'])

    const wrapperProps = this.getWrapperProps()

    return (
      <div {...wrapperProps} {...passedProps}>
        <input onChange={this.onChange} className={inputCls} ref={this.setRef} type='file' />
        {
          value && url
            ? <div
              onClick={this.onClick}
              style={{ backgroundImage: `url(${url})` }}
              className={imageCls}
            >
              <Icon className={iconRemoveCls} name='clear' onClick={this.onRemove} />
            </div>
            : <Button className={buttonCls} onClick={this.onClick}>{label}</Button>
        }
      </div>
    )
  }
}

ImageInput.propTypes = propTypes

ImageInput.defaultProps = defaultProps

export default ImageInput