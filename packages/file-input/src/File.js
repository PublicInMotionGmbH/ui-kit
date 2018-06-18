import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Icon } from '@talixo/icon'

import { formatBytes } from './utils'

const moduleName = 'file'

const propTypes = {
  /**  */
  file: PropTypes.object,

  /**  */
  onRemove: PropTypes.func
}

const defaultProps = {}

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
        <Icon name='insert_drive_file' className={iconCls} />{' '}
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
