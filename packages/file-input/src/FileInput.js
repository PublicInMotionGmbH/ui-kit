import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Button } from '@talixo/button'

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
  exit: 'onDragExit',
  leave: 'onDragLeave',
  over: 'onDragOver',
  start: 'onDragStart'
}

const propTypes = {
  /** Label of browse file button. */
  buttonLabel: PropTypes.string,

  /** Content displayed in drop box. */
  children: PropTypes.node,

  /** Additional class name. */
  className: PropTypes.string,

  /** Disable drag and drop. */
  dropDisabled: PropTypes.bool,

  /** File component renderer. */
  fileRender: PropTypes.func,

  /**  */
  multiple: PropTypes.bool,

  /** onChange callback. Invoked when either files have been dropped or file input has changed. */
  onChange: PropTypes.func
}

const defaultProps = {
  buttonLabel: 'Browse Files',
  dropDisabled: false,
  multiple: true
}

/**
 * Component which represents File Input.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class FileInput extends React.PureComponent {
  state = {
    draggingOver: false,
    files: this.props.files || [],
    idStorage: this.props.files ? registerElements(this.props.files) : new Map()
  }

  componentDidMount () {
    this.prevent = e => e.preventDefault()
    document.addEventListener('drop', this.prevent)
    document.addEventListener('dragover', this.prevent)
  }

  componentWillUnmount () {
    document.removeEventListener('drop', this.prevent)
    document.removeEventListener('dragover', this.prevent)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.files != null && nextProps.files !== this.props.files) {
      this.setState({
        files: nextProps.files,
        idStorage: registerElements(nextProps.files)
      })
    }
  }

  handleClick = () => {
    if (this.input) {
      this.input.click()
    }
  }

  handleDrag = (type, e) => {
    e.preventDefault()
    const files = getDataTransferFiles(e)

    if (type === events.enter) {
      this.setState({ draggingOver: true })
    }

    if (type === events.start) {
      return
    }

    if (type === events.end || type === events.leave || type === events.exit) {
      this.setState({ draggingOver: false })
    }

    if (this.props[type]) {
      this.props[type](files, e)
    }
  }

  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { files: propsFiles, multiple, onChange } = this.props
    const { files } = this.state
    const uploadedFiles = getDataTransferFiles(e)
    const noFiles = !uploadedFiles || uploadedFiles.length < 1
    const tooMany = (!multiple && files.length > 0) || (!multiple && uploadedFiles.length > 1)

    if (noFiles || tooMany || propsFiles != null) {
      this.setState({ draggingOver: false })
      return
    }

    const newFiles = files.concat([...uploadedFiles])

    if (onChange) {
      onChange(newFiles, e)
    }
    const newIdStorage = registerElements(newFiles)

    this.setState({ files: newFiles, idStorage: newIdStorage, draggingOver: false })
  }

  handleRemove (file) {
    const { files } = this.state
    const newFiles = files.filter(item => item !== file)
    const newIdStorage = registerElements(newFiles)

    this.setState({ files: newFiles, idStorage: newIdStorage })
  }

  getWrapperProps = () => {
    const { className, dropDisabled } = this.props
    const { draggingOver } = this.state
    const { handleDrag, handleDrop } = this
    const wrapperCls = buildClassName(moduleName, className, { dragover: draggingOver })
    const dragProps = !dropDisabled
      ? {
        onDragEnter: handleDrag.bind(this, events.enter),
        onDragStart: handleDrag.bind(this, events.start),
        onDragOver: handleDrag.bind(this, events.over),
        onDrop: handleDrop
      }
      : {}

    return {
      className: wrapperCls,
      ...dragProps
    }
  }

  getFileElements = () => {
    const { filesRender } = this.props
    const { files, idStorage } = this.state
    const { handleRemove } = this
    const filesCls = buildClassName([moduleName, 'files-wrapper'])
    const FileComponent = filesRender || File

    return (
      <React.Fragment>
        <div className={filesCls}>
          {
            files.map((file, index) => (
              <FileComponent
                key={idStorage.get(file)}
                onRemove={handleRemove.bind(this, file)}
                file={file}
              />
            ))
          }
        </div>
      </React.Fragment>
    )
  }

  getCoverElement = () => {
    const { handleDrop, handleDrag } = this
    const coverCls = buildClassName([moduleName, 'cover'])

    const props = {
      onDrop: handleDrop,
      onDragEnd: handleDrag.bind(this, events.end),
      onDragLeave: handleDrag.bind(this, events.leave),
      onDragOver: handleDrag.bind(this, events.over),
      onDragExit: handleDrag.bind(this, events.exit)
    }

    return (
      <div className={coverCls} {...props} />
    )
  }

  setInputRef = node => { this.input = node }

  render () {
    const {
      buttonLabel, className, children, dropDisabled, fileRender, multiple, onChange,
      onDragEnd, onDragEnter, onDragExit, onDragLeave, onDragOver, onDragStart,
      ...passedProps
    } = this.props
    const { files, draggingOver } = this.state
    const { handleClick, handleDrop, getCoverElement, getFileElements, getWrapperProps, setInputRef } = this
    // Class names
    const childrenCls = buildClassName([moduleName, 'children'])
    const buttonCls = buildClassName([moduleName, 'button'])
    // Get props for wrapper
    const wrapperProps = getWrapperProps()

    return (
      <div {...passedProps} {...wrapperProps}>
        { !dropDisabled && draggingOver && getCoverElement() }
        <div className={childrenCls}>{ children }</div>
        <div className={buttonCls}><Button onClick={handleClick}>{ buttonLabel }</Button></div>
        { files.length > 0 && getFileElements() }
        <input
          style={{ display: 'none' }}
          ref={setInputRef}
          onChange={handleDrop}
          type='file'
          multiple={multiple}
        />
      </div>
    )
  }
}
FileInput.propTypes = propTypes

FileInput.defaultProps = defaultProps

export default FileInput
