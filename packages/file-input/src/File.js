import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Icon } from '@talixo/icon'

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
  const wrapperCls = buildClassName(moduleName)
  const iconCls = buildClassName([moduleName, 'icon'])

  return (
    <div className={wrapperCls}>
      <Icon name='clear' onClick={onRemove} className={iconCls} /> File: { file.name }, size: { file.size }
    </div>
  )
}

File.propTypes = propTypes

File.defaultProps = defaultProps

export default File
