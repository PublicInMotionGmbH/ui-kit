import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

import { Button } from '@talixo/button'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'image-input'

/**
 * Component which represents Image Input.
 *
 * @property {object} props
 * @property {string} [props.className]
 *
 * @class {React.Element}
 */
class ImageInput extends React.Component {
  state = {

  }

  reader = new window.FileReader()

  componentDidMount () {
    this.reader.onload = this.finishChange
  }

  onChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.indexOf('image') > -1) {
      this.reader.readAsDataURL(file)
    }
  }

  onClick = () => {
    this.input.click()
  }

  finishChange = (e) => {
    const { onChange } = this.props
    const file = e.target.result
    console.log(file)
    if (this.state.value === file) { return }

    this.setState({ value: file })

    if (onChange) {
      onChange(file)
    }
  }

  setRef = (node) => {
    this.input = findDOMNode(node)
  }

  render () {
    const { className, label, ...passedProps } = this.props
    const { value } = this.state
    const wrapperCls = buildClassName(moduleName, className)
    const inputCls = buildClassName([moduleName, 'input'], className)
    const imageCls = buildClassName([moduleName, 'image'], className)

    return (
      <div className={wrapperCls} {...passedProps}>
        <input onChange={this.onChange} className={inputCls} ref={this.setRef} type='file' />
        {
          value
            ? <div onClick={this.onClick} style={{ backgroundImage: `url(${value})` }} className={imageCls} />
            : <Button onClick={this.onClick}>{label}</Button>
        }
      </div>
    )
  }
}

ImageInput.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

ImageInput.defaultProps = {
}

export default ImageInput
