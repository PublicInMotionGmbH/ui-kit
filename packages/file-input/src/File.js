import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Icon } from '@talixo/icon'

import { formatBytes } from './utils'

const moduleName = 'file'

const propTypes = {
  /** File information object. */
  file: PropTypes.object,

  /** File onRemove handler. */
  onRemove: PropTypes.func
}

const defaultProps = {
  onRemove: () => {}
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
const File = (props) => {
  const { file, onRemove } = props
  const iconCls = buildClassName([moduleName, 'icon'])
  const nameCls = buildClassName([moduleName, 'name'])
  const removeCls = buildClassName([moduleName, 'remove'])
  const sizeCls = buildClassName([moduleName, 'size'])
  const wrapperCls = buildClassName(moduleName)

  return (
    <div className={wrapperCls}>
      <div>
        <Icon name='clear' onClick={onRemove} className={removeCls} />
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

File.defaultProps = defaultProps

export default File
