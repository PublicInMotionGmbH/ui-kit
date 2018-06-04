import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import TreeNode from './TreeNode'

const moduleName = 'tree'

/**
 * Function to recursivly define propTypes
 * @param {func} f
 * @returns {function}
 */
function lazyFunction (f) {
  return function () {
    return f.apply(this, arguments)
  }
}

const lazyDataType = lazyFunction(function () {
  return dataType
})

const dataType = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(lazyDataType)
}))

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Data passed to generate tree view */
  data: dataType.isRequired,

  /** Open tree when load component */
  initialOpen: PropTypes.bool,

  /** Enable to select tree nodes */
  selectEnabled: PropTypes.bool,

  /** Collapse tree with smooth effect */
  smooth: PropTypes.bool
}
/**
 * Component which represents Tree.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {array} [props.data]
 * @param {boolean} [props.initialOpen]
 * @param {boolean} [props.selectEnabled]
 * @param {boolean} [props.smooth]
 * @returns {React.Element}
 */
function Tree (props) {
  const { data, initialOpen, selectEnabled, smooth } = props
  const clsName = buildClassName(moduleName)
  const children = data.map((el, i) =>
    <TreeNode initialOpen={initialOpen} selectEnabled={selectEnabled} key={i} node={el} children={el.children} smooth={smooth} />
  )
  return (<ul className={clsName}>{children}</ul>)
}

Tree.propTypes = propTypes

export default Tree
