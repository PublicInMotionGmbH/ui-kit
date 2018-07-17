import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

import { Button } from '@talixo/button'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'image-input'

/**
 * Creates image URL which can e used to display image.
 *
 * @param {string|object} file
 * @param {string} type
 * @returns {string}
 */
function getImageUrl (file, type) {
  // Handle URL type.
  if (type === 'url') {
    return file
  }

  // Generate Blob and create preview URL
  if (type === 'binary') {
    const blob = new window.Blob([file])
    const newUrl = window.URL.createObjectURL(blob)
    return newUrl
  }

  // Create preview URL of file
  if (type === 'file') {
    const newUrl = window.URL.createObjectURL(file)
    return newUrl
  }

  return null
}

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
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
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
 *
 * @class {React.Element}
 */
class ImageInput extends React.Component {
  state = {
    value: this.props.value || null,
    url: this.props.value ? getImageUrl(this.props.value, this.props.type) : null
  }

  /**
   * FileReader which is used to handle transfered files.
   *
   * @type {FileReader}
   */
  reader = new window.FileReader()

  componentDidMount () {
    // Add event listener to FileReader.
    this.reader.onload = this.finishChange
  }

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
    const { onChange, value: propsValue, type } = this.props
    const { value, url: stateUrl } = this.state
    const file = e.target.files[0]

    // Check if file is the same or not of image type.
    if (!file || !(file.type.indexOf('image') > -1) || file === value) {
      return
    }

    // Handle image upload if type of returned value should be URL.
    if (type === 'url') {
      this.reader.readAsDataURL(file)
    }

    // Handle image upload if type of returned value should be binary.
    if (type === 'binary') {
      this.reader.readAsArrayBuffer(file)
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
   * Saves ref to file input.
   *
   * @param {Element} node
   */
  setRef = (node) => {
    this.input = findDOMNode(node)
  }

  render () {
    const { className, label, onChange, type, value: propsValue, ...passedProps } = this.props
    const { value, url } = this.state

    // Class names
    const wrapperCls = buildClassName(moduleName, className)
    const inputCls = buildClassName([moduleName, 'input'], className)
    const imageCls = buildClassName([moduleName, 'image'], className)

    return (
      <div className={wrapperCls} {...passedProps}>
        <input onChange={this.onChange} className={inputCls} ref={this.setRef} type='file' />
        {
          value && url
            ? <div
              onClick={this.onClick}
              style={{ backgroundImage: `url(${url})` }}
              className={imageCls}
            />
            : <Button onClick={this.onClick}>{label}</Button>
        }
      </div>
    )
  }
}

ImageInput.propTypes = propTypes

ImageInput.defaultProps = defaultProps

export default ImageInput
