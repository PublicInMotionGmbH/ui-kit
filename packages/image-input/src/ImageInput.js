import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

import { Button } from '@talixo/button'
import { buildClassName } from '@talixo/shared'

import { events, getDataTransferFile, getImageUrl } from './helpers'

export const moduleName = 'image-input'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Upload button label. */
  label: PropTypes.string,

  /** Function which handles image change. Receives URL data, ArrayBuffer, or File object. */
  onChange: PropTypes.func,

  /** Type of data passed to onChange function: `url`, `binary`, `file`. */
  type: PropTypes.oneOf(['url', 'binary', 'file']),

  /** Image which can be controlled from outside component */
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

  /** onDragEnd callback. Applies sent files and event. */
  onDragEnd: PropTypes.func,

  /** onDragEnter callback. Applies sent files and event. */
  onDragEnter: PropTypes.func,

  /** onDragExit callback. Applies sent files and event. */
  onDragExit: PropTypes.func,

  /** onDragLeave callback. Applies sent files and event. */
  onDragLeave: PropTypes.func,

  /** onDragOver callback. Applies sent files and event. */
  onDragOver: PropTypes.func,

  /** onDragEnd callback. Applies sent files and event. */
  onDragStart: PropTypes.func
}

const defaultProps = {
  type: 'url'
}

/**
 * Component which represents Image Input.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {string} [props.label]
 * @property {function} [props.onChange]
 * @property {string} [props.type]
 * @property {object|string} [props.value]
 * @property {function} [props.onDragEnd]
 * @property {function} [props.onDragEnter]
 * @property {function} [props.onDragExit]
 * @property {function} [props.onDragLeave]
 * @property {function} [props.onDragOver]
 * @property {function} [props.onDragStart]
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
    this.prevent = e => e.preventDefault()
    document.addEventListener('drop', this.prevent)
    document.addEventListener('dragover', this.prevent)
  }

  /**
   * Removes preventing default drop and dragover actions.
   */
  componentWillUnmount () {
    document.removeEventListener('drop', this.prevent)
    document.removeEventListener('dragover', this.prevent)
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
    const { draggingOver } = this.state
    const { onDrag, onChange } = this

    // Class names
    const wrapperCls = buildClassName(moduleName, className, { dragover: draggingOver })
    const wrapperProps = {
      onDragEnter: onDrag.bind(this, events.enter),
      onDragStart: onDrag.bind(this, events.start),
      onDragOver: onDrag.bind(this, events.over),
      onDragEnd: onDrag.bind(this, events.end),
      onDragLeave: onDrag.bind(this, events.leave),
      onDragExit: onDrag.bind(this, events.exit),
      onDrop: onChange,
      className: wrapperCls
    }
    return wrapperProps
  }

  render () {
    const { className, label, onChange: change, type, value: propsValue, onDragEnd,
      onDragEnter, onDragExit, onDragLeave, onDragOver, onDragStart, ...passedProps
    } = this.props
    const { value, url } = this.state

    // Class names
    const inputCls = buildClassName([moduleName, 'input'])
    const imageCls = buildClassName([moduleName, 'image'])
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
            />
            : <Button className={buttonCls} onClick={this.onClick}>{label}</Button>
        }
      </div>
    )
  }
}

ImageInput.propTypes = propTypes

ImageInput.defaultProps = defaultProps

export default ImageInput
