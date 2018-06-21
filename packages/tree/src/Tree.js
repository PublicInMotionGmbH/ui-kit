import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import TreeNode from './TreeNode'

const moduleName = 'tree'

/**
 * Only way to handle recursive data types through PropTypes.
 * https://github.com/facebook/react/issues/5676
 */
const lazyDataType = (...args) => dataType(...args)

const dataType = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(lazyDataType)
}))

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Data passed to generate tree view */
  data: dataType.isRequired,

  /** Open tree when load component */
  initiallyOpen: PropTypes.bool,

  /** Function passed onClick, It allows to select node */
  onClick: PropTypes.func,

  /** Collapse tree with smooth effect */
  smooth: PropTypes.bool,

  /** How the node should be rendered? */
  renderNode: PropTypes.func
}

const defaultProps = {
  initiallyOpen: false,
  smooth: true,
  renderNode: x => x.name
}
/**
 * Component which represents Tree.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {object[]} props.data
 * @param {boolean} props.initiallyOpen
 * @param {boolean} props.smooth
 * @param {function} props.renderNode
 * @returns {React.Element}
 */
function Tree (props) {
  const { data, initiallyOpen, smooth, renderNode, ...restProps } = props

  function build (node, index) {
    return (
      <TreeNode
        initiallyOpen={initiallyOpen}
        key={index}
        node={node}
        render={renderNode}
        children={node.children ? node.children.map(build) : node.children}
        smooth={smooth}
      />
    )
  }

  const clsName = buildClassName(moduleName)
  const children = data.map(build)

  return (<ul className={clsName} {...restProps}>{children}</ul>)
}

Tree.propTypes = propTypes
Tree.defaultProps = defaultProps

export default Tree
