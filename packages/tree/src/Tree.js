import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import TreeNode from './TreeNode'

const moduleName = 'tree'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Data passed to generate tree view */
  data: PropTypes.array.isRequired,

  /** Open tree when load */
  initialOpen: PropTypes.bool,

  /** Enable to select tree nodes */
  selectEnabled: PropTypes.bool
}
/**
 * Component which represents Tree.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Tree (props) {
  const { data, selectEnabled } = props
  const clsName = buildClassName(moduleName)
  const children = data.map((i) => {
    return (<TreeNode initialOpen={props.initialOpen} selectEnabled={selectEnabled} key={i.id} node={i} children={i.children} />)
  })
  return (<ul className={clsName}>{children}</ul>)
}

Tree.propTypes = propTypes

export default Tree
