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
  leave: 'onDragLeave',
  start: 'onDragStart'
}

const propTypes = {
  /** Label of browse file button. */
  buttonLabel: PropTypes.string,

  /** Content displayed in drop box. */
  children: PropTypes.node,

  /** Additional class name. */
  className: PropTypes.string,

  /** Enable drag and drop. */
  dropEnabled: PropTypes.bool,

  /** File component renderer. */
  fileRender: PropTypes.func,

  /**  */
  multiple: PropTypes.bool,

  /** onChange callback. Invoked when either files have been dropped or file input has changed. */
  onChange: PropTypes.func
}

const defaultProps = {
  buttonLabel: 'Browse Files',
  dropEnabled: true,
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

  // shouldComponentUpdate (nextProps, nextState) {
  //   if (nextState.draggingOver === this.state.draggingOver) return false
  //   return true
  // }

  handleClick = () => {
    if (this.input) {
      this.input.click()
    }
  }

  handleDrag = (type, e) => {
    e.preventDefault()
    const files = getDataTransferFiles(e)

    if (type === events.enter || (type === events.start && !e.currentTarget.contains(this.input))) {
      this.setState({ draggingOver: true })
    }
    if (type === events.start && e.currentTarget.contains(this.input)) {
      this.setState({ draggingOver: false })
    }

    if (type === events.leave || type === events.end) {
      this.setState({ draggingOver: false })
    }

    if (this.props[type]) {
      this.props[type](files, e)
    }
  }

  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { multiple, onChange } = this.props
    const { files } = this.state
    const uploadedFiles = getDataTransferFiles(e)
    const tooMany = (!multiple && files.length > 0) || (!multiple && uploadedFiles.length > 1)

    if (uploadedFiles.length < 1 || tooMany) {
      this.setState({ draggingOver: false })
      return
    }

    const newFiles = files.concat([...uploadedFiles])
    const newIdStorage = registerElements(newFiles)
    if (onChange) {
      onChange(newFiles, e)
    }

    this.setState({ files: newFiles, idStorage: newIdStorage, draggingOver: false })
  }

  handleRemove (file) {
    const { files } = this.state
    const newFiles = files.filter(item => item !== file)
    const newIdStorage = registerElements(newFiles)

    this.setState({ files: newFiles, idStorage: newIdStorage })
  }

  getWrapperProps = () => {
    const { className, dropEnabled } = this.props
    const { draggingOver } = this.state
    const { handleDrag, handleDrop } = this
    const wrapperCls = buildClassName(moduleName, className, { dragover: draggingOver })
    const dragProps = dropEnabled
      ? {
        onDragEnter: handleDrag.bind(this, events.enter),
        onDragStart: handleDrag.bind(this, events.start),
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

    return (
      <React.Fragment>
        {
          filesRender && typeof filesRender === 'function'
            ? filesRender(files)
            : <div className={filesCls}>
              {
                files.map((file, index) => (
                  <File
                    key={idStorage.get(file)}
                    onRemove={handleRemove.bind(this, file)}
                    file={file}
                  />
                ))
              }
            </div>
        }
      </React.Fragment>
    )
  }

  setInputRef = node => { this.input = node }

  render () {
    const { buttonLabel, className, children, dropEnabled, fileRender, multiple, onChange, ...passedProps } = this.props
    const { files, draggingOver } = this.state
    const { handleClick, handleDrag, handleDrop, getFileElements, getWrapperProps, setInputRef } = this
    // Class names
    const childrenCls = buildClassName([moduleName, 'children'])
    const buttonCls = buildClassName([moduleName, 'button'])
    const coverCls = buildClassName([moduleName, 'cover'])
    // Get props for wrapper
    const wrapperProps = getWrapperProps()
    console.log('render')

    return (
      <div {...passedProps} {...wrapperProps}>
        {
          dropEnabled && draggingOver &&
          <div
            onDrop={handleDrop}
            onDragEnd={handleDrag.bind(this, events.end)}
            onDragLeave={handleDrag.bind(this, events.leave)}
            className={coverCls}
          />
        }
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
