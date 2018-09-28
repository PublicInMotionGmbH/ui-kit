import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Button } from '@talixo/button'

import File from './File'
import { getDataTransferFiles } from './utils'

export const moduleName = 'file-input'

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
  renderFile: PropTypes.func,

  /** Dropped files. */
  files: PropTypes.array,

  /** Allows multiple files uploading. */
  multiple: PropTypes.bool,

  /** Label displayed alongside button. */
  uploadLabel: PropTypes.node,

  /** onChange callback. Invoked when either files have been dropped or file input has changed. */
  onChange: PropTypes.func,

  /** File onRemove callback. */
  onRemove: PropTypes.func,

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
  buttonLabel: 'Browse Files',
  dropDisabled: false,
  renderFile: File,
  multiple: true
}

/**
 * Component which represents File Input.
 *
 * @property {object} props
 * @property {string} [props.buttonLabel]
 * @property {*} [props.children]
 * @property {string} [props.className]
 * @property {boolean} [props.dropDisabled]
 * @property {function} [props.renderFile]
 * @property {string} [props.files]
 * @property {boolean} [props.multiple]
 * @property {function} [props.onChange]
 * @property {function} [props.onDragEnd]
 * @property {function} [props.onDragEnter]
 * @property {function} [props.onDragExit]
 * @property {function} [props.onDragLeave]
 * @property {function} [props.onDragOver]
 * @property {function} [props.onDragStart]
 * @class
 */
class FileInput extends React.PureComponent {
  state = {
    draggingOver: false,
    files: this.props.files || []
  }

  /**
   * Prevents default drop and dragover actions.
   */
  componentDidMount () {
    document.addEventListener('drop', this.preventDefault)
    document.addEventListener('dragover', this.preventDefault)
  }

  /**
   * Removes preventing default drop and dragover actions.
   */
  componentWillUnmount () {
    document.removeEventListener('drop', this.preventDefault)
    document.removeEventListener('dragover', this.preventDefault)
  }

  /**
   * Handles exteranal file changes.
   * @param {object} nextProps
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.files != null && nextProps.files !== this.props.files) {
      this.setState({
        files: nextProps.files
      })
    }
  }

  /**
   * Ignore event.
   * It needs to be created for each component,
   * to make sure that we will not remove all listeners on unmounting.
   *
   * @param {Event|SyntheticEvent} event
   */
  preventDefault = (event) => {
    event.preventDefault()
  }

  /**
   * Opens file input dialog
   */
  handleClick = () => {
    if (this.input) {
      this.input.click()
    }
  }

  /**
   * Handles drag actions.
   *
   * @param {string} type
   * @param {Event|SyntheticEvent} e
   */
  handleDrag = (type, e) => {
    e.preventDefault()

    const files = getDataTransferFiles(e)

    if (type === events.enter) {
      this.setState({ draggingOver: true })
    }

    if (type === events.end || type === events.leave || type === events.exit) {
      this.setState({ draggingOver: false })
    }

    if (this.props[type]) {
      this.props[type](files, e)
    }
  }

  /**
   * Handles file drop actions
   * @param {Event|SyntheticEvent} event
   */
  handleDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const { files: propsFiles, multiple, onChange } = this.props
    const { files } = this.state

    // Copy uploaded files
    const uploadedFiles = getDataTransferFiles(event)

    // Check if any files have been added
    const noFiles = !uploadedFiles || uploadedFiles.length < 1

    // Check if user wants to send too many files
    const tooMany = (!multiple && files.length > 0) || (!multiple && uploadedFiles.length > 1)

    // Ignore action if we can't accept these files
    if (noFiles || tooMany) {
      this.setState({ draggingOver: false })
      return
    }

    // Combine previous and new files
    const uploadedFilesArray = [].slice.call(uploadedFiles)
    const newFiles = files.concat(uploadedFilesArray)

    // Handle controlled or self-controlled component
    if (propsFiles != null) {
      this.setState({ draggingOver: false })
    } else {
      this.setState({ files: newFiles, draggingOver: false })
    }

    // Emit 'change' event with new files list
    if (onChange) {
      onChange(newFiles, event)
    }
  }

  /**
   * Remove file from list.
   *
   * @param {object} file
   * @param {Event|SyntheticEvent} event
   */
  handleRemove = (file, event) => {
    const { files: propsFiles, onRemove, onChange } = this.props
    const { files } = this.state

    // Remove file from files list
    const newFiles = files.filter(item => item !== file)

    // Nothing has changed, file doesn't exist
    if (newFiles.length === files.length) {
      return
    }

    // Emit 'remove' event
    if (onRemove) {
      onRemove(file, event)
    }

    // Emit 'change' event
    if (onChange) {
      onChange(newFiles, event)
    }

    // Set up correctly self-controlled value
    if (propsFiles == null) {
      this.setState({ files: newFiles })
    }
  }

  /**
   * Generates wrapper props.
   *
   * @returns {object}
   */
  getWrapperProps () {
    const { className, dropDisabled } = this.props
    const { draggingOver } = this.state

    const wrapperCls = buildClassName(moduleName, className, { dragover: draggingOver })

    const dragProps = dropDisabled ? {} : {
      onDragEnter: this.handleDrag.bind(this, events.enter),
      onDragStart: this.handleDrag.bind(this, events.start),
      onDragOver: this.handleDrag.bind(this, events.over),
      onDrop: this.handleDrop
    }

    return {
      className: wrapperCls,
      ...dragProps
    }
  }

  /**
   * Generates file elements.
   *
   * @returns {React.Element}
   */
  getFileElements () {
    const { renderFile } = this.props
    const { files } = this.state

    const filesCls = buildClassName([ moduleName, 'files-wrapper' ])
    const FileComponent = renderFile

    const elements = files.map((file, index) => (
      <FileComponent
        key={index}
        onRemove={this.handleRemove}
        file={file}
      />
    ))

    return (
      <div className={filesCls}>
        {elements}
      </div>
    )
  }

  /**
   * Generates input covering element.
   *
   * @returns {React.Element}
   */
  getCoverElement () {
    const coverCls = buildClassName([ moduleName, 'cover' ])

    const props = {
      onDrop: this.handleDrop,
      onDragEnd: this.handleDrag.bind(this, events.end),
      onDragLeave: this.handleDrag.bind(this, events.leave),
      onDragOver: this.handleDrag.bind(this, events.over),
      onDragExit: this.handleDrag.bind(this, events.exit)
    }

    return (
      <div className={coverCls} {...props} />
    )
  }

  /**
   * Saves input reference.
   *
   * @param {React.Element} node
   */
  setInputRef = node => {
    this.input = node
  }

  render () {
    const {
      buttonLabel, children, className, dropDisabled, files: propsFiles, renderFile, multiple, uploadLabel,
      onChange, onRemove, onDragEnd, onDragEnter, onDragExit, onDragLeave, onDragOver, onDragStart, ...passedProps
    } = this.props
    const { files, draggingOver } = this.state

    // Class names
    const childrenCls = buildClassName([ moduleName, 'children' ])
    const buttonCls = buildClassName([ moduleName, 'button' ])

    // Get props for wrapper
    const wrapperProps = this.getWrapperProps()

    // Get cover elements
    const coverElements = draggingOver && !dropDisabled ? this.getCoverElement() : null

    // Get file elements
    const fileElements = files.length > 0 ? this.getFileElements() : null

    return (
      <div {...passedProps} {...wrapperProps}>
        {coverElements}

        <div className={childrenCls}>{children}</div>
        <div className={buttonCls}>
          {uploadLabel} <Button onClick={this.handleClick} small>{buttonLabel}</Button>
        </div>

        {fileElements}

        <input
          style={{ display: 'none' }}
          ref={this.setInputRef}
          onChange={this.handleDrop}
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
