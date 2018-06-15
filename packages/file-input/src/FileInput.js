import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import File from './File'
import { getDataTransferFiles } from './utils'

export const moduleName = 'file-input'

export function registerElements (rows) {
  const newStorage = new Map()

  for (let i = 0; i < rows.length; i++) {
    newStorage.set(rows[i], i)
  }
  return newStorage
}

// const events = ['onDragEnter', ]

const propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

const defaultProps = {
}

/**
 * Component which represents File Input.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class FileInput extends React.Component {
  state = {
    files: [],
    idStorage: new Map()
  }

  componentDidMount () {
    document.addEventListener('drop', e => e.preventDefault())
    document.addEventListener('dragover', e => e.preventDefault())
  }

  componentWillUnmount () {
    document.removeEventListener('drop', e => e.preventDefault())
    document.removeEventListener('dragover', e => e.preventDefault())
  }

  handleClick = () => {
    if (this.input) {
      this.input.click()
    }
  }

  handleDragAction = (action, e) => {
    e.preventDefault()
    e.stopPropagation()
    const files = getDataTransferFiles(e)
    if (this.props[action]) {
      this.props[action](files, e)
    }
  }

  handleDrop = (e) => {
    e.preventDefault()
    const { onDrop } = this.props
    const { files } = this.state
    const uploadedFiles = getDataTransferFiles(e)

    if (!uploadedFiles) return
    const newFiles = files.concat([...uploadedFiles])
    const newIdStorage = registerElements(newFiles)
    if (onDrop) {
      onDrop(newFiles, e)
    }

    this.setState({ files: newFiles, idStorage: newIdStorage })
  }

  handleRemove (file) {
    const { files } = this.state
    const newFiles = files.filter(item => item !== file)
    const newIdStorage = registerElements(newFiles)

    this.setState({ files: newFiles, idStorage: newIdStorage })
  }

  setInputRef = node => { this.input = node }

  render () {
    const { className, children, ...passedProps } = this.props
    const { files, idStorage } = this.state
    const { handleRemove, handleClick, handleDrag, handleDrop, setInputRef } = this
    // Class names
    const wrapperCls = buildClassName(moduleName, className)
    const childrenCls = buildClassName([moduleName, 'children'])
    const filesCls = buildClassName([moduleName, 'files-wrapper'])
    const uploadBtnCls = buildClassName([moduleName, 'upload'])

    return (
      <div
        className={wrapperCls}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        {...passedProps}
      >
        <div className={childrenCls}>
          { children }
        </div>
        <div
          className={uploadBtnCls}
          onClick={handleClick}
        >
          Click here to upload
        </div>

        <div className={filesCls}>
          {
            files.map((file, index) => (
              <File key={idStorage.get(file)} onRemove={handleRemove.bind(this, file)} file={file} />
            ))
          }
        </div>
        <input
          style={{ display: 'none' }}
          ref={setInputRef}
          onChange={handleDrop}
          type='file'
          multiple
        />
      </div>
    )
  }
}
FileInput.propTypes = propTypes

FileInput.defaultProps = defaultProps

export default FileInput
