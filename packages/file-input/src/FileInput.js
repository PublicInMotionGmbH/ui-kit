import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Button } from '@talixo/button'
import { Icon } from '@talixo/icon'

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

const events = {
  end: 'onDragEnd',
  enter: 'onDragEnter',
  leave: 'onDragLeave',
  over: 'onDragOver'
}

const propTypes = {
  buttonLabel: PropTypes.string,

  /** Additional class name */
  className: PropTypes.string
}

const defaultProps = {
  buttonLabel: 'Browse Files'
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
    dragover: false,
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

  handleDrag = (type, e) => {
    e.preventDefault()
    // e.stopPropagation()
    const files = getDataTransferFiles(e)

    if (type === events.enter) {
      this.setState({ dragover: true })
    }

    if (type === events.leave || type === events.end) {
      this.setState({ dragover: false })
    }

    if (this.props[type]) {
      this.props[type](files, e)
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

  getWrapperProps = () => {
    const { className } = this.props
    const { handleDrag, handleDrop } = this
    const wrapperCls = buildClassName(moduleName, className)

    return {
      className: wrapperCls,
      onDragEnter: handleDrag.bind(this, events.enter),
      onDragEnd: handleDrag.bind(this, events.end),
      onDragLeave: handleDrag.bind(this, events.leave),
      onDragOver: handleDrag.bind(this, events.over),
      onDrop: handleDrop
    }
  }

  setInputRef = node => { this.input = node }

  render () {
    const { buttonLabel, className, children, ...passedProps } = this.props
    const { dragover, files, idStorage } = this.state
    const { handleClick, handleDrop, handleRemove, getWrapperProps, setInputRef } = this
    // Class names
    const childrenCls = buildClassName([moduleName, 'children'])
    const iconCls = buildClassName([moduleName, 'icon'])
    const shadowCls = buildClassName([moduleName, 'shadow'])
    const filesCls = buildClassName([moduleName, 'files-wrapper'])
    const uploadCls = buildClassName([moduleName, 'upload'])
    // Get props for wrapper
    const wrapperProps = getWrapperProps()

    return (
      <div {...passedProps} {...wrapperProps}>
        { dragover && <div className={shadowCls} /> }
        <div className={iconCls}><Icon name='cloud_upload' /></div>
        <div className={childrenCls}>{ children }</div>
        <div className={uploadCls}><Button onClick={handleClick}>{ buttonLabel }</Button></div>
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
