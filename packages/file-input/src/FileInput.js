import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { getDataTransferFiles } from './utils'

export const moduleName = 'file-input'

/**
 * Component which represents File Input.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class FileInput extends React.Component {
  state = {
    files: []
  }
  handleClick = () => {
    if (this.input) {
      this.input.click()
    }
  }

  handleDrag = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  handleDrop = (e) => {
    e.preventDefault()
    const { onDrop } = this.props
    const { files } = this.state
    const uploadedFiles = getDataTransferFiles(e)

    if (!uploadedFiles) return

    const newFiles = files.concat([...uploadedFiles])
    if (onDrop) {
      onDrop(newFiles, e)
    }

    this.setState({ files: newFiles })
  }

  setInputRef = node => { this.input = node }

  render () {
    const { className, ...passedProps } = this.props
    const { files } = this.state
    const { handleClick, handleDrag, handleDrop, setInputRef } = this
    const inputCls = buildClassName(moduleName, className)
    const filesCls = buildClassName([moduleName, 'files'], className)

    console.log(files)

    return (
      <div {...passedProps}>
        <div
          className={inputCls}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            style={{ display: 'none' }}
            ref={setInputRef}
            onChange={handleDrop}
            type='file'
            multiple
          />
        </div>
        <div className={filesCls}>
          {
            files.map((file, index) => (
              <div key={index}>File: { file.name }</div>
            ))
          }
        </div>
      </div>
    )
  }
}
FileInput.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

FileInput.defaultProps = {
}

export default FileInput
