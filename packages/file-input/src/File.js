import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Icon } from '@talixo/icon'

import { formatBytes } from './utils'

export const moduleName = 'file-input-file'

const propTypes = {
  /** File information object. */
  file: PropTypes.object.isRequired,

  /** File onRemove handler. */
  onRemove: PropTypes.func
}

/**
 * Component which represents uploaded file.
 *
 * @param {object} props
 * @param {object} props.file
 * @param {function} [props.onRemove]
 *
 * @returns {Element|React.Element}
 */
function File (props) {
  const { file, onRemove } = props

  const iconCls = buildClassName([ moduleName, 'icon' ])
  const infoCls = buildClassName([ moduleName, 'info' ])
  const descriptionCls = buildClassName([ moduleName, 'description' ])
  const nameCls = buildClassName([ moduleName, 'name' ])
  const removeCls = buildClassName([ moduleName, 'remove' ])
  const sizeCls = buildClassName([ moduleName, 'size' ])
  const wrapperCls = buildClassName(moduleName)

  function onClick (e) {
    if (onRemove) {
      onRemove(file, e)
    }
  }

  return (
    <div className={wrapperCls}>
      <button className={removeCls} onClick={onClick}>
        <Icon name='clear' />
      </button>
      <div className={infoCls}>
        <Icon name='insert_drive_file' className={iconCls} />
        <div className={descriptionCls}>
          <strong className={nameCls}>{file.name}</strong>
          <span className={sizeCls}>{formatBytes(file.size)}</span>
        </div>
      </div>
    </div>
  )
}

File.propTypes = propTypes

export default File
