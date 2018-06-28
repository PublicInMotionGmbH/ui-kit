import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Icon } from '@talixo/icon'

import { formatBytes } from './utils'

export const moduleName = 'file'

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
  const iconCls = buildClassName([moduleName, 'icon'])
  const nameCls = buildClassName([moduleName, 'name'])
  const removeCls = buildClassName([moduleName, 'remove'])
  const sizeCls = buildClassName([moduleName, 'size'])
  const wrapperCls = buildClassName(moduleName)

  function onClick (e) {
    if (onRemove) {
      onRemove(file, e)
    }
  }

  return (
    <div className={wrapperCls}>
      <div>
        <Icon name='clear' onClick={onClick} className={removeCls} />
        <Icon name='insert_drive_file' className={iconCls} />
      </div>
      <div>
        <div className={nameCls}>{ file.name }</div>
        <div className={sizeCls}>{ formatBytes(file.size) }</div>
      </div>
    </div>
  )
}

File.propTypes = propTypes

export default File
